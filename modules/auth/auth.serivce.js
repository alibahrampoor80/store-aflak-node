import {otpModel, usersModel} from "../users/users.model.js";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

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

        const {accessToken, refreshToken} = generateToken({userId: user.id})
        return res.json({
            message: "ورود انجام شد",
            accessToken, refreshToken
        })


    } catch (err) {
        next(err)
    }
}

function generateToken(payload) {
    const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: "7d"
    })
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: "30d"
    })
    return {accessToken, refreshToken}
}


async function verifyRefreshTokenService(req, res, next) {
    try {
        const {REFRESH_TOKEN_SECRET} = process.env
        const {refreshToken} = req.body
        if (!refreshToken) throw createHttpError(401, "لطفا وارد سایت شوید")
        const verified = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
        if (verified?.userId) {
            const user = await usersModel.findByPk(verified?.userId)
            if (!user) throw createHttpError(401, "لطفا وارد حساب کاربری خود شوید")
            const {accessToken, refreshToken} = generateToken({userId: user.id})
            return res.json({accessToken, refreshToken})
        }
    } catch (err) {
        next(createHttpError(401, "لطفا وارد حساب کاربری خود شوید"))
    }
}

export {sendOtpService, checkOtpService, verifyRefreshTokenService}