import {Router} from "express";
import {productRoutes} from "../modules/product/product.routes.js";
import {authRouter} from "../modules/auth/auth.routes.js";

const allRoutes = Router()

allRoutes.use("/products", productRoutes)
allRoutes.use("/auth", authRouter)

export {allRoutes}