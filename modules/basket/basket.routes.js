import {Router} from "express";
import {addToCartService, getCartService} from "./basket.service.js";
import {authGuard} from "../auth/auth.guard.js";

const basketRoutes = Router()

basketRoutes.post('/addToCart', authGuard, addToCartService)
basketRoutes.get('/list', authGuard, getCartService)

export {basketRoutes}