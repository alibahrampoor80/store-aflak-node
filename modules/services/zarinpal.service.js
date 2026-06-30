import axios from "axios";
import createHttpError from "http-errors";

async function zarinpalRequestService(amount, user, description = "خرید محصول") {
    const result = await axios.post(process.env.ZARINPAL_REQUEST_URL, {
        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
        amount: amount,
        description,
        currency: "IRT",
        metadata: {
            email: "",
            mobile: user?.mobile,
        },
        callback_url: process.env.ZARINPAL_MERCHANT_CALLBACK_URL,
    }).catch(err => {
        return err
    })
    const {data} = result
    if (data?.data?.authority) {
        return {
            paymentUrl: `${process.env.ZARINPAL_GETWAY_URL}/${data?.data?.authority}`,
            authority: data?.data?.authority,
        }
    }
    throw createHttpError(400, "سرویس درگاه در دسترس نیست")
}

async function zarinpalVerifyService(amount, authority) {
    const result = await axios.post(process.env.REQUEST_URL_VERIFY, {
        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
        amount: amount,
        authority,
    }).catch(err => {
        return err
    })
    const {data: responseVerify} = result

    const {data} = responseVerify

    if (data?.code === 100) {
        return {
            message: data?.code,
            refId: data?.ref_id
        }
    } else if (data?.code === 101) {
        throw createHttpError(400, "این پرداخت قبلا تایید شده است")
    }
    throw createHttpError(400, "سرویس درگاه در دسترس نیست")
}


export {zarinpalRequestService, zarinpalVerifyService}