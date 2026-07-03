import {Router} from "express";
import {addToCartService, deleteItemBasketService, getCartService} from "./basket.service.js";
import {authGuard} from "../auth/auth.guard.js";

const basketRoutes = Router()

basketRoutes.post('/addToCart', authGuard, addToCartService)
basketRoutes.delete('/list/:id', authGuard, deleteItemBasketService)
basketRoutes.get('/list', authGuard, getCartService)

export {basketRoutes}