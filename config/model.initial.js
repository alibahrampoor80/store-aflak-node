import {sequelizeConfig} from "./sequelize.config.js";
import {
    productColorModel,
    productDetailModel,
    productModel,
    productSizeModel
} from "../modules/product/product.model.js";
import {otpModel, usersModel} from "../modules/users/users.model.js";
import {refreshTokenModel} from "../modules/users/refreshToken.model.js";

export async function modelInitial() {
    productModel.hasMany(productDetailModel, {foreignKey: 'productId', sourceKey: "id", as: "details",})
    productDetailModel.belongsTo(productModel, {foreignKey: "productId", targetKey: "id",})

    productModel.hasMany(productColorModel, {foreignKey: "productId", sourceKey: "id", as: "colors"})
    productColorModel.belongsTo(productModel, {foreignKey: "productId", targetKey: "id"})

    productModel.hasMany(productSizeModel, {foreignKey: "productId", sourceKey: "id", as: "sizes"})
    productSizeModel.belongsTo(productModel, {foreignKey: "productId", targetKey: "id"})

    usersModel.hasOne(otpModel, {foreignKey: "userId", as: "otp", sourceKey: "id"})
    otpModel.hasOne(usersModel, {foreignKey: "otpId", as: "otp", sourceKey: "id"})
    otpModel.belongsTo(usersModel, {foreignKey: "userId", targetKey: "id"})

    usersModel.hasOne(refreshTokenModel, {foreignKey: "userId", as: "refreshToken", sourceKey: "id"})
    refreshTokenModel.belongsTo(usersModel, {foreignKey: "userId", targetKey: "id"})
    // await sequelizeConfig.sync({force: true})
    // await refreshTokenModel.sync()
}