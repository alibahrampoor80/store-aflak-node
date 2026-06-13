import {productColorModel, productDetailModel, productModel, productSizeModel} from "./product.model.js";
import {productType} from "../../common/constant/product.const.js";
import createHttpError from "http-errors";

async function createProductService(req, res, next) {
    try {

        const {
            title,
            description,
            sizes,
            colors,
            discount = null,
            active_discount = null,
            price = null,
            count = null,
            type,
            details,
        } = req.body

        if (!Object.values(productType).includes(type)) {
            throw createHttpError(400, "نوع محصول ارسال شده نامعتبر است")
        }

        const product = await productModel.create({
            title,
            description,
            price,
            discount,
            active_discount,
            count,
            type,
        })

        if (details && Array.isArray(details)) {
            let detailList = []
            for (const item of details) {
                detailList.push({
                    key: item?.id,
                    value: item?.value,
                    productId: product?.id,
                })
            }

            if (detailList.length > 0) {
                await productDetailModel.bulkCreate(detailList)
            }
        }

        if (type === productType.coloring) {

            if (colors && Array.isArray(colors)) {
                let colorsList = []
                for (const item of colors) {
                    colorsList.push({
                        color_name: item?.name,
                        color_code: item?.code,
                        price: item?.price,
                        discount: item?.discount,
                        active_discount: item?.active_discount,
                        count: item?.count,
                        productId: product?.id,
                    })
                }
                if (colorsList.length > 0) {
                    await productColorModel.bulkCreate(colorsList)
                }
            }
        }
        if (type === productType.sizing) {
            if (sizes && Array.isArray(sizes)) {
                let sizingList = []
                for (const item of sizes) {
                    sizingList.push({
                        size: item?.size,
                        discount: item?.discount,
                        active_discount: item?.active_discount,
                        count: item?.count,
                        productId: product?.id,
                    })
                }
                if (sizingList.length > 0) {
                    await productSizeModel.bulkCreate(sizingList)
                }
            }
        }

        return res.json({
            status: 201,
            message: "محصول ساخته شد"
        })

    } catch (err) {
        next(err)
    }
}


export {createProductService}