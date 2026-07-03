import {orderStatus} from "../../common/constant/order.const.js";
import createHttpError from "http-errors";
import {orderItemsModel, orderModel} from "./order.model.js";
import {productColorModel, productModel, productSizeModel} from "../product/product.model.js";
import {usersModel} from "../users/users.model.js";

async function getOrdersService(req, res, next) {
    try {
        const {id: userId} = req?.user ?? {}
        const {status} = req.query
        if (!status || !Object.values(orderStatus).includes(status)) throw createHttpError(400, "یک وضعیت معتبر ارسال کنید")

        const orders = await orderModel.findAll({
            where: {status, userId},

        })

        return res.json({
            result: orders,
        })
    } catch (err) {
        next(err)
    }
}

async function getOrderByIdService(req, res, next) {
    try {
        const {id: userId} = req?.user ?? {}

        const {id} = req.params


        const order = await orderModel.findByPk(id, {
            where: {id, userId},
            include: [
                {
                    model: orderItemsModel, as: "items",
                    include: [
                        {model: productModel, as: "product"},
                        {model: productColorModel, as: "color"},
                        {model: productSizeModel, as: "size"},
                    ]
                },
                {model: usersModel, as: "users"},

            ]
        })
        if (!order) throw createHttpError(404, "سفارش یافت نشد")
        return res.json({
            result: order,
        })
    } catch (err) {
        next(err)
    }
}

async function setPackedStatusToOrderService(req, res, next) {
    try {
        const {id} = req.params
        const order = await orderModel.findByPk(id)
        if (!order) throw createHttpError(404, "سفارش یافت نشد")
        if (order.status !== orderStatus.inProcess) throw createHttpError(400, "وضعیت سفارش باید در حال انجام باشد")
        order.status = orderStatus.packed
        await order.save()
        return res.json({
            message: "تنظیم سفارش برای خط بسته‌ بندی انجام شد"
        })

    } catch (err) {
        next(err)
    }
}

async function setInTransitStatusToOrderService(req, res, next) {
    try {
        const {id} = req.params
        const order = await orderModel.findByPk(id)
        if (!order) throw createHttpError(404, "سفارش یافت نشد")
        if (order.status !== orderStatus.packed) throw createHttpError(400, "وضعیت سفارش باید در حالت بسته بندی باشد")
        order.status = orderStatus.inTransit
        await order.save()
        return res.json({
            message: "تنظیم سفارش ترانزیت است"
        })

    } catch (err) {
        next(err)
    }
}

async function setCanceledStatusToOrderService(req, res, next) {
    try {
        const {id} = req.params
        const {reason} = req.body
        const order = await orderModel.findByPk(id)
        if (!order) throw createHttpError(404, "سفارش یافت نشد")
        if ([orderStatus.pending, orderStatus.delivered, orderStatus.canceled].includes(order.status))
            throw createHttpError(400, "لطفا وضعیت را درست انتخاب کنید")
        order.status = orderStatus.canceled
        order.reason = reason
        await order.save()
        return res.json({
            message: " سفارش کنسل شد"
        })

    } catch (err) {
        next(err)
    }
}

async function setDeliveryStatusToOrderService(req, res, next) {
    try {
        const {id} = req.params
        const order = await orderModel.findByPk(id)
        if (!order) throw createHttpError(404, "سفارش یافت نشد")
        if (order.status !== orderStatus.inTransit) throw createHttpError(400, "وضعیت سفارش باید در حالت ترانزیت باشد")
        order.status = orderStatus.delivered
        await order.save()
        return res.json({
            message: "تنظیم سفارش برای تحویل انجام شد"
        })

    } catch (err) {
        next(err)
    }
}

export {
    getOrdersService,
    getOrderByIdService,
    setPackedStatusToOrderService,
    setInTransitStatusToOrderService,
    setCanceledStatusToOrderService,
    setDeliveryStatusToOrderService
}
