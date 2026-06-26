import {productColorModel, productModel, productSizeModel} from "../product/product.model.js";
import createHttpError from "http-errors";
import {productType} from "../../common/constant/product.const.js";
import {basketModel} from "./basket.model.js";
import {usersModel} from "../users/users.model.js";
import {discountModel} from "../discount/discount.model.js";

async function addToCartService(req, res, next) {
    try {
        const {id: userId = undefined} = req.user ?? {}
        const {productId, sizeId, colorId} = req.body

        const product = await productModel.findByPk(productId)
        if (!product) throw createHttpError(404, "محصول یافت نشد")

        const basketItem = {
            productId: product.id,
            userId
        }
        let productCount = undefined
        let colorCount = undefined
        let sizeCount = undefined
        if (product.type === productType.coloring) {

            if (!colorId) throw createHttpError(400, "یک رنگ ارسال کنید")
            const productColor = await productColorModel.findOne({
                where: {
                    id: colorId,
                    productId
                }
            })

            if (!productColor) throw createHttpError(404, "رنگ یافت نشد")
            basketItem["colorId"] = colorId
            colorCount = productColor?.count ?? 0

            if (colorCount === 0) throw createHttpError(400, "تعداد رنگ محصول نمیتواند صفر باشد")
        } else if (product.type === productType.sizing) {

            if (!sizeId) throw createHttpError(400, "یک سایز ارسال کنید")
            const productSize = await productSizeModel.findOne({
                where: {
                    id: sizeId,
                    productId
                }
            })
            if (!productSize) throw createHttpError(404, "سایز یافت نشد")
            basketItem["sizeId"] = sizeId
            sizeCount = productSize?.count ?? 0
            if (sizeCount === 0) throw createHttpError(400, "تعداد سایز محصول نمیتواند صفر باشد")
        } else {
            productCount = product?.count ?? 0
            if (productCount === 0) throw createHttpError(400, "تعداد محصول نمیتواند صفر باشد")
        }
        const basket = await basketModel.findOne({where: basketItem})

        if (basket) {
            if (sizeCount && sizeCount > basket?.count) {
                basket.count += 1
            } else if (colorCount && colorCount > basket?.count) {
                basket.count += 1
            } else if (productCount && productCount > basket?.count) {
                basket.count += 1
            } else {
                throw createHttpError(400, "تعداد محصول کافی نیست")
            }
            await basket.save()
        } else {
            await basketModel.create({...basketItem, count: 1})
        }
        return res.json({
            message: "محصول به سبد اضافه شد"
        })
    } catch (err) {
        next(err)
    }
}

async function getCartService(req, res, next) {
    try {
        const {id: userId} = req.user ?? {}
        const basket = await basketModel.findAll({
            where: {userId},
            include: [
                {model: usersModel, as: "user"},
                {model: productModel, as: "product",},
                {model: productSizeModel, as: "size"},
                {model: productColorModel, as: "color"},
                {model: discountModel, as: "discount"}
            ]
        })

        let totalAmount = 0
        let totalDiscount = 0
        let finalAmount = 0
        let finalBasket = []

        for (const item of basket) {
            const {product, size, color, count} = item
            const productIndex = finalBasket.findIndex(item => item.id === product.id)
            let productData = finalBasket.find(item => item.id === product.id)

            if (!productData) {
                productData = {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    type: product.type,
                    count,
                    sizes: [],
                    colors: []
                }
            } else {
                productData.count += count
            }
            if (product.type === productType.coloring && color) {
                let price = color?.price * count
                totalAmount += price
                let discountAmount = 0
                let finalPrice = price
                if (color?.active_discount && color?.discount > 0) {
                    discountAmount = price * (color?.discount / 100)
                    totalDiscount += discountAmount
                }
                finalPrice = (price - discountAmount)
                finalAmount += finalPrice
                productData['colors'].push({
                    id: color.id,
                    color_name: color.color_name,
                    color_code: color.color_code,
                    price,
                    originalPrice: +color.price,
                    discountAmount,
                    finalPrice,
                    count
                })

            } else if (product.type === productType.sizing && size) {
                let price = size?.price * count
                totalAmount += price
                let discountAmount = 0
                let finalPrice = price
                if (size?.active_discount && size?.discount > 0) {
                    discountAmount = price * (size?.discount / 100)
                    totalDiscount += discountAmount
                }
                finalPrice = (price - discountAmount)
                finalAmount += finalPrice
                productData['sizes'].push({
                    id: size.id,
                    size: size.size,
                    originalPrice: +size.price,
                    price,
                    discountAmount,
                    finalPrice,
                    count
                })

            } else if (product.type === productType.single && product) {
                let price = product?.price * count
                totalAmount += price
                let discountAmount = 0
                let finalPrice = price
                if (product?.active_discount && product?.discount > 0) {
                    discountAmount = price * (product?.discount / 100)
                    totalDiscount += discountAmount
                }
                finalPrice = (price - discountAmount)
                finalAmount += finalPrice
                productData['finalPrice'] = finalPrice
                productData['originalPrice'] = +product.price
                productData['discountAmount'] = discountAmount

            }
            if (productIndex > -1) finalBasket[productIndex] = productData
            else finalBasket.push(productData)
        }
        return res.json({
            totalDiscount,
            finalAmount,
            totalAmount,
            basket: finalBasket
        })

    } catch (err) {
        next(err)
    }
}

export {addToCartService, getCartService}