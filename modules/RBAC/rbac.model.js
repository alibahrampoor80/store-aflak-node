import {sequelizeConfig} from "../../config/sequelize.config.js";
import {DataTypes} from "@sequelize/core";

const roleModel = sequelizeConfig.define("role", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    title: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: true},
}, {timestamps: true, modelName: "role", createdAt: "created_at", updatedAt: "updated_at"})

const permissionModel = sequelizeConfig.define("permission", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    title: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: true},
}, {timestamps: true, modelName: "permission", createdAt: "created_at", updatedAt: "updated_at"})

const rolePermissionModel = sequelizeConfig.define("rolePermission", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    roleId: {type: DataTypes.INTEGER, allowNull: false},
    permissionId: {type: DataTypes.INTEGER, allowNull: false},
}, {timestamps: true, modelName: "rolePermission", createdAt: "created_at", updatedAt: "updated_at"})

export {
    roleModel,
    permissionModel,
    rolePermissionModel
}