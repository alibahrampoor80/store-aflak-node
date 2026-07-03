import {Router} from "express";
import {authGuard} from "../auth/auth.guard.js";
import {
    getOrderByIdService,
    getOrdersService,
    setPackedStatusToOrderService,
    setInTransitStatusToOrderService,
    setCanceledStatusToOrderService,
    setDeliveryStatusToOrderService
} from "./order.service.js";
import {canceledValidation} from "./order.validation.js";

const orderRoutes = Router()

orderRoutes.get('/list', authGuard, getOrdersService)
orderRoutes.get('/list/:id', authGuard, getOrderByIdService)
orderRoutes.patch('/set-packed/:id', authGuard, setPackedStatusToOrderService)
orderRoutes.patch('/set-transit/:id', authGuard, setInTransitStatusToOrderService)
orderRoutes.patch('/set-cancel/:id', authGuard, canceledValidation, setCanceledStatusToOrderService)
orderRoutes.patch('/set-delivery/:id', authGuard, setDeliveryStatusToOrderService)

export {orderRoutes}