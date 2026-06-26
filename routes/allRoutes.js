import {Router} from "express";
import {productRoutes} from "../modules/product/product.routes.js";
import {authRouter} from "../modules/auth/auth.routes.js";
import {basketRoutes} from "../modules/basket/basket.routes.js";
import {authGuard} from "../modules/auth/auth.guard.js";

const allRoutes = Router()

allRoutes.use("/products", productRoutes)
allRoutes.use("/auth", authRouter)
allRoutes.use("/cart", authGuard, basketRoutes)

export {allRoutes}