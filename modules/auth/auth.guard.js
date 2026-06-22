import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import {usersModel} from "../users/users.model.js";

async function authGuard(req, res, next) {
    try {
        const authorization = req.headers?.authorization ?? undefined;
        const {ACCESS_TOKEN_SECRET} = process.env;

        if (!authorization) throw createHttpError(401, "لطفا وارد سایت شوید")

        let [bearer, token] = authorization.split(' ');

        if (bearer && bearer.toLowerCase() === 'bearer') {
            if (!token) throw createHttpError(401, "لطفا وارد حساب کاربری خود شوید")

            try {
                const verified = jwt.verify(token, ACCESS_TOKEN_SECRET)

                if (!verified?.userId) throw createHttpError(401, "لطفا وارد حساب کاربری خود شوید")

                const user = await usersModel.findByPk(verified?.userId)
                if (!user) throw createHttpError(401, "لطفا وارد حساب کاربری خود شوید")

                req.user = {
                    id: user?.id,
                    mobile: user?.mobile,
                    fullName: user?.fullName,
                };
                return next()

            } catch (jwtError) {

                if (jwtError.name === 'JsonWebTokenError' && jwtError.message === 'invalid signature') {
                    throw createHttpError(401, "توکن معتبر نیست یا دستکاری شده است")
                }
                if (jwtError.name === 'TokenExpiredError') {
                    throw createHttpError(401, "توکن منقضی شده است، لطفا مجددا وارد شوید")
                }
                if (jwtError.name === 'JsonWebTokenError') {
                    throw createHttpError(401, "توکن نامعتبر است")
                }
                throw createHttpError(401, "خطا در احراز هویت")
            }
        }
        throw createHttpError(401, "لطفا وارد حساب کاربری خود شوید")

    } catch (err) {
        next(err)
    }
}

export {authGuard}