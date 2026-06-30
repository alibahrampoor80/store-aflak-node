import {getUserBasketById} from "../basket/basket.service.js";
import {paymentModel} from "./payment.model.js";
import {orderItemsModel, orderModel} from "../order/order.model.js";
import {orderStatus} from "../../common/constant/order.const.js";
import {zarinpalRequestService, zarinpalVerifyService} from "../services/zarinpal.service.js";
import createHttpError from "http-errors";
import {basketModel} from "../basket/basket.model.js";

async function paymentBasketService(req, res, next) {
    try {
        const {id: userId} = req.user ?? {}
        const {totalDiscount, totalAmount, basket, finalAmount} = await getUserBasketById(userId)
        const payment = await paymentModel.create({
            userId, amount: finalAmount, status: false
        })

        const order = await orderModel.create({
            userId,
            paymentId: payment?.id,
            total_amount: totalAmount,
            final_amount: finalAmount,
            discount_amount: totalDiscount,
            status: orderStatus.pending,
            address: "اصفهان کاشان خیابان طالقانی محراب ششم"
        })
        payment.orderId = order.id


        let orderList = []
        for (const item of basket) {
            let items = []
            if (item?.sizes?.length > 0) {
                items = item?.sizes.map((size) => {
                    return {
                        orderId: order?.id, productId: item?.id, sizeId: size?.id, count: size?.count,
                    }
                })
            } else if (item?.colors?.length > 0) {
                items = item?.colors.map((color) => {
                    return {
                        orderId: order?.id, productId: item?.id, colorId: color?.id, count: color?.count,
                    }
                })
            } else {
                items = [{
                    orderId: order?.id, productId: item?.id, colorId: item?.id,
                }]
            }
            orderList.push(...items)

        }
        await orderItemsModel.bulkCreate(orderList)

        const result = await zarinpalRequestService(payment?.amount, req?.user)
        payment.authority = result?.authority
        await payment.save()

        return res.json({
            paymentUrl: result.paymentUrl
        })
    } catch (err) {
        next(err)
    }
}

async function paymentVerifyService(req, res, next) {
    try {
        const {Authority, Status} = req?.query

        if (Status === "OK" && Authority) {
            const payment = await paymentModel.findOne({where: {authority: Authority}})

            if (!payment) throw createHttpError(404, "پرداخت یافت نشد")
            const resPayment = await zarinpalVerifyService(payment?.amount, payment?.authority)

            if (resPayment) {
                payment.status = true
                payment.refId = resPayment?.refId.toString()
                const order = await orderModel.findByPk(payment?.orderId)
                if (!order) throw createHttpError(404, "سفارش یافت نشد")
                order.status = orderStatus.inProcess
                await payment.save()
                await order.save()
                await basketModel.destroy({where: {userId: order.userId}})
                res.redirect("https://www.ali-bahrampoor.ir/payment?status=success");
            } else {
                await paymentModel.destroy({where: {id: payment?.id}})
                await orderModel.destroy({where: {id: payment?.orderId}})
            }
        }
        return res.redirect("https://www.ali-bahrampoor.ir/payment?status=failure")
    } catch (err) {
        // next(err)
        console.log(err)
        res.redirect("https://www.ali-bahrampoor.ir/payment?status=failure")
    }
}

export {paymentBasketService, paymentVerifyService}