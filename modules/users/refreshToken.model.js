import {sequelizeConfig} from "../../config/sequelize.config.js";
import {DataTypes} from "@sequelize/core";

const refreshTokenModel = sequelizeConfig.define('refresh_token', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },


}, {modelName: "refresh_token", timestamps: true, updatedAt: "updated_at", createdAt: "created_at",});

export {refreshTokenModel}