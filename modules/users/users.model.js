import {sequelizeConfig} from "../../config/sequelize.config.js";
import {DataTypes} from "@sequelize/core";

const usersModel = sequelizeConfig.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullName: {
        type: DataTypes.STRING(120),
        allowNull: true,
    },
    mobile: {
        type: DataTypes.STRING(120),
        allowNull: false,
    },
    otpId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },


}, {modelName: "users", timestamps: true, updatedAt: "updated_at", createdAt: "created_at",});

const otpModel = sequelizeConfig.define('otp_user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    expireIn: {
        type: DataTypes.DATE,
        allowNull: false,
    },

}, {modelName: "otp_user", timestamps: false});

export {otpModel, usersModel}