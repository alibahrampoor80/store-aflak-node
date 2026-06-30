import {Router} from "express";
import {paymentBasketService, paymentVerifyService} from "./payment.service.js";
import {authGuard} from "../auth/auth.guard.js";

const paymentRoutes = Router()

paymentRoutes.post('/create', authGuard, paymentBasketService)
paymentRoutes.get('/callback', paymentVerifyService)

export {paymentRoutes}