import {Router} from "express";
import {productRoutes} from "../modules/product/product.routes.js";
import {authRouter} from "../modules/auth/auth.routes.js";
import {basketRoutes} from "../modules/basket/basket.routes.js";
import {authGuard} from "../modules/auth/auth.guard.js";
import {paymentRoutes} from "../modules/payment/payment.routes.js";
import {orderRoutes} from "../modules/order/order.routes.js";

const allRoutes = Router()

allRoutes.use("/products", productRoutes)
allRoutes.use("/auth", authRouter)
allRoutes.use("/cart", basketRoutes)
allRoutes.use("/payment", paymentRoutes)
allRoutes.use("/orders", orderRoutes)

export {allRoutes}