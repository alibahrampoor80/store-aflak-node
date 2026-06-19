import {otpModel, usersModel} from "../users/users.model.js";
import createHttpError from "http-errors";

async function sendOtpService(req, res, next) {
    try {
        const {mobile} = req.body

        let code = Math.floor(Math.random() * 99999 - 10000) + 10000

        let otp = null

        let user = await usersModel.findOne({
            where: {
                mobile
            }
        })
        if (!user) {
            user = await usersModel.create({mobile})
            otp = await otpModel.create({
                code: code.toString(),
                expireIn: new Date(Date.now() + 1000 * 60),
                userId: user.id
            })

            user.otpId = otp.id
            await user.save()

            return res.json({
                message: "کد برای شما ارسال شد",
                code
            })
        } else {

            // otp = await otpModel.create({
            //     code: code.toString(),
            //     expireIn: new Date(Date.now() + 1000 * 60),
            //     userId: user.id
            // })

            otp = await otpModel.findOne({where: {userId: user?.id}})
            otp.code = code.toString()
            otp.expireIn = new Date(Date.now() + 1000 * 60)
            await otp.save()

            user.otpId = otp.id
            await user.save()

            return res.json({
                message: "کد برای شما ارسال شد",
                code
            })
        }

    } catch (err) {
        next(err)
    }
}

async function checkOtpService(req, res, next) {
    try {
        const {mobile, code} = req.body
        let user = await usersModel.findOne({
            where: {
                mobile
            },
            include: [
                {
                    model: otpModel,
                    as: "otp"
                }
            ]
        })

        if (!user) {
            throw createHttpError(401, "کاربر یافت نشد")
        }

        if (user?.otp?.code !== code) {
            throw createHttpError(401, "کد اشتباه است")
        }
        if (user?.otp?.expireIn < new Date()) {
            throw createHttpError(401, "کد منقضی شده است")
        }

        return res.json({
            message: "ورود انجام شد"
        })

    } catch (err) {
        next(err)
    }
}

export {sendOtpService, checkOtpService}