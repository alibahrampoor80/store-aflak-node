import {Router} from "express";
import {checkOtpService, sendOtpService, verifyRefreshTokenService} from "./auth.serivce.js";
import {checkOtpValidation, sendOtpValidation} from "./auth.validation.js";
import {authGuard} from "./auth.guard.js";

const authRouter = Router()

authRouter.post('/send-otp', sendOtpValidation, sendOtpService)
authRouter.post('/check-otp', checkOtpValidation, checkOtpService)
authRouter.post('/refresh-token', verifyRefreshTokenService)
authRouter.get('/check-login', authGuard, (req, res, next) => {
    res.json(req.user ?? {})
})

export {authRouter}