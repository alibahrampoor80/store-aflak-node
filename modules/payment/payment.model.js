import {sequelizeConfig} from "../../config/sequelize.config.js";
import {DataTypes} from "@sequelize/core";

const paymentModel = sequelizeConfig.define('payment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: DataTypes.BOOLEAN, defaultValue: false
    },
    amount: {
        type: DataTypes.DECIMAL(15, 0)
    },
    refId: {type: DataTypes.STRING, allowNull: true},
    authority: {type: DataTypes.STRING, allowNull: true},
    orderId: {type: DataTypes.INTEGER, allowNull: true},
    userId: {type: DataTypes.INTEGER, allowNull: true},
}, {modelName: "payment", timestamps: true, createdAt: "created_at", updatedAt: "updated_at"})
export {paymentModel}