import {Router} from "express";
import {createPermissionService, createRoleService} from "./rbac.service.js";
import {authGuard} from "../auth/auth.guard.js";
import {rbacPermissionValidation, rbacRoleValidation} from "./rbac.validation.js";


const rbacRoutes = Router()

rbacRoutes.post('/create-role', authGuard, rbacRoleValidation, createRoleService)
rbacRoutes.post('/create-permission', authGuard, rbacPermissionValidation, createPermissionService)

export default rbacRoutes;