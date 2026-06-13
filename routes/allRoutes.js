import {Router} from "express";
import {productRoutes} from "../modules/product/product.routes.js";

const allRoutes = Router()

allRoutes.use("/products", productRoutes)

export {allRoutes}