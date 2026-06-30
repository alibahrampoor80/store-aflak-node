import {sequelizeConfig} from "../../config/sequelize.config.js";
import {DataTypes} from "@sequelize/core";
import {orderStatus} from "../../common/constant/order.const.js";

const orderModel = sequelizeConfig.define('order', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    paymentId: {type: DataTypes.INTEGER, allowNull: true},
    status: {type: DataTypes.ENUM(...Object.values(orderStatus)), defaultValue: orderStatus.pending},
    address: {type: DataTypes.TEXT},
    userId: {type: DataTypes.INTEGER},
    total_amount: {type: DataTypes.DECIMAL(15, 0)},
    final_amount: {type: DataTypes.DECIMAL(15, 0)},
    discount_amount: {type: DataTypes.DECIMAL(15, 0)},
    reason: {type: DataTypes.STRING, allowNull: true},
}, {modelName: "order", timestamps: true, createdAt: "created_at", updatedAt: "updated_at"})

const orderItemsModel = sequelizeConfig.define('order_item', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    orderId: {type: DataTypes.INTEGER, allowNull: true},
    productId: {type: DataTypes.INTEGER},
    sizeId: {type: DataTypes.INTEGER, allowNull: true},
    colorId: {type: DataTypes.INTEGER, allowNull: true},
    count: {type: DataTypes.INTEGER},

}, {modelName: "order_item", timestamps: true, createdAt: "created_at", updatedAt: "updated_at"})

export {
    orderModel,
    orderItemsModel,
}