import {Router} from "express";
import {createProductService, getProductByIdService, getProductsService} from "./product.service.js";
import {createProductValidation} from "./product.validation.js";

const productRoutes = Router()

productRoutes.post("/create", createProductValidation, createProductService)
productRoutes.get("/", getProductsService)
productRoutes.get("/:id", getProductByIdService)

export {productRoutes}