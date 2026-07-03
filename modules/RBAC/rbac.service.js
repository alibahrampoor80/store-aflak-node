import {permissionModel, roleModel} from "./rbac.model.js";
import createHttpError from "http-errors";

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


export {
    createRoleService, createPermissionService
}