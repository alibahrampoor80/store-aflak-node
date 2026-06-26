import {sequelizeConfig} from "../../config/sequelize.config.js";
import {DataTypes} from "@sequelize/core";

const basketModel = sequelizeConfig.define("basket", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {type: DataTypes.INTEGER, allowNull: true},
    sizeId: {type: DataTypes.INTEGER, allowNull: true},
    colorId: {type: DataTypes.INTEGER, allowNull: true},
    discountId: {type: DataTypes.INTEGER, allowNull: true},
    count: {type: DataTypes.INTEGER, allowNull: false},
}, {modelName: "basket", timestamps: true, createdAt: "created_at", updatedAt: "updated_at",})

export {basketModel}