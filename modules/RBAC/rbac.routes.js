import {Router} from "express";
import {
    assignPermissionToRoleService,
    createPermissionService,
    createRoleService, getAllPermissionsService,
    getAllRolesService
} from "./rbac.service.js";
import {authGuard} from "../auth/auth.guard.js";
import {assignRoleToPermissionValidation, rbacPermissionValidation, rbacRoleValidation} from "./rbac.validation.js";


const rbacRoutes = Router()

rbacRoutes.get('/get-all-roles', authGuard, getAllRolesService)
rbacRoutes.get('/get-all-permissions', authGuard, getAllPermissionsService)
rbacRoutes.post('/create-role', authGuard, rbacRoleValidation, createRoleService)
rbacRoutes.post('/create-permission', authGuard, rbacPermissionValidation, createPermissionService)
rbacRoutes.post('/add-permission-role', authGuard, assignRoleToPermissionValidation, assignPermissionToRoleService)

export default rbacRoutes;