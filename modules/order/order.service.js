import {orderStatus} from "../../common/constant/order.const.js";
import createHttpError from "http-errors";
import {orderModel} from "./order.model.js";

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

export {getOrdersService}
