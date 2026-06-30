import {Router} from "express";
import {authGuard} from "../auth/auth.guard.js";
import {getOrdersService} from "./order.service.js";

const orderRoutes = Router()

orderRoutes.get('/list', authGuard, getOrdersService)

export {orderRoutes}