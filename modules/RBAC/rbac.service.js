import {permissionModel, roleModel, rolePermissionModel} from "./rbac.model.js";
import createHttpError from "http-errors";
import {Op} from "@sequelize/core";

async function createRoleService(req, res, next) {
    try {
        const {title, description} = req.body

        const existRole = await roleModel.findOne({where: {title}})
        if (existRole) throw createHttpError(409, "نقش وجود دارد")

        await roleModel.create({title, description})

        return res.status(201).json({
            message: "نقش ساخته شد"
        })

    } catch (err) {
        next(err)
    }
}

async function createPermissionService(req, res, next) {
    try {
        const {title, description} = req.body

        const existPermission = await permissionModel.findOne({where: {title}})
        if (existPermission) throw createHttpError(409, "دسترسی وجود دارد")

        await permissionModel.create({title, description})

        return res.status(201).json({
            message: "دسترسی ساخته شد"
        })

    } catch (err) {
        next(err)
    }
}

async function getAllRolesService(req, res, next) {
    try {
        const roles = await roleModel.findAll({attributes: ['id', 'title', 'description']})
        return res.json({
            result: roles
        })
    } catch (err) {
        next(err)
    }
}

async function getAllPermissionsService(req, res, next) {
    try {
        const roles = await permissionModel.findAll({attributes: ['id', 'title', 'description']})
        return res.json({
            result: roles
        })
    } catch (err) {
        next(err)
    }
}

async function assignPermissionToRoleService(req, res, next) {
    try {
        let {roleId, permissions = []} = req.body
        const role = await roleModel.findOne({where: {id: roleId}})
        if (!role) throw createHttpError(404, "نقش مورد نظر پیدا نشد")

        if (permissions.length > 0) {
            const permissionsCount = await permissionModel.count({
                where: {
                    id: {
                        [Op.in]: permissions
                    }
                }
            })

            if (permissionsCount !== permissions.length) {
                throw createHttpError(400, "یک لیست معتبر ارسال کنید")
            }

            const permissionsList = permissions.map((permission) => (
                {
                    roleId,
                    permissionId: permission
                }
            ))

            await rolePermissionModel.bulkCreate(permissionsList, {
                updateOnDuplicate: ['permissionId', "roleId"],
            })
            return res.json({
                message: "اختصاص مجوز به نقش داده شد"
            })
        }
    } catch (err) {
        next(err)
    }
}

export {
    createRoleService, createPermissionService,
    assignPermissionToRoleService,
    getAllRolesService, getAllPermissionsService
}