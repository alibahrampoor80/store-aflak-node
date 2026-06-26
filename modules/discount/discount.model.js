import {sequelizeConfig} from "../../config/sequelize.config.js";
import {DataTypes} from "@sequelize/core";

const discountModel = sequelizeConfig.define('discount', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productId: {type: DataTypes.INTEGER, allowNull: true},
    code: {type: DataTypes.STRING, allowNull: false},
    type: {type: DataTypes.ENUM("basket", "product")},
    amount: {type: DataTypes.INTEGER},
    percent: {type: DataTypes.INTEGER},
    limit: {type: DataTypes.INTEGER, allowNull: true},
    usage: {type: DataTypes.INTEGER, allowNull: true},
    expireIn: {type: DataTypes.DATE, allowNull: true},

}, {
    modelName: 'discount',
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});
export {discountModel}