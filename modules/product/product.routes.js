import {Router} from "express";
import {createProductService} from "./product.service.js";
import {createProductValidation} from "./product.validation.js";

const productRoutes = Router()

productRoutes.post("/create", createProductValidation, createProductService)

export {productRoutes}