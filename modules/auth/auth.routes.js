import {Router} from "express";
import {checkOtpService, sendOtpService, verifyRefreshTokenService} from "./auth.serivce.js";
import {checkOtpValidation, sendOtpValidation} from "./auth.validation.js";

const authRouter = Router()

authRouter.post('/send-otp',sendOtpValidation, sendOtpService)
authRouter.post('/check-otp',checkOtpValidation, checkOtpService)
authRouter.post('/refresh-token', verifyRefreshTokenService)

export {authRouter}