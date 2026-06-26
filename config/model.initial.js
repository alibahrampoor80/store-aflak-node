import {sequelizeConfig} from "./sequelize.config.js";
import {
    productColorModel,
    productDetailModel,
    productModel,
    productSizeModel
} from "../modules/product/product.model.js";
import {otpModel, usersModel} from "../modules/users/users.model.js";
import {refreshTokenModel} from "../modules/users/refreshToken.model.js";
import {basketModel} from "../modules/basket/basket.model.js";
import {discountModel} from "../modules/discount/discount.model.js";

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

    productModel.hasMany(basketModel, {foreignKey: "productId", sourceKey: "id", as: "basket",})
    productSizeModel.hasMany(basketModel, {foreignKey: "sizeId", sourceKey: "id", as: "basket",})
    productColorModel.hasMany(basketModel, {foreignKey: "colorId", sourceKey: "id", as: "basket",})
    usersModel.hasMany(basketModel, {foreignKey: "userId", sourceKey: "id", as: "basket"})
    discountModel.hasMany(basketModel, {foreignKey: "discountId", sourceKey: "id", as: "basket"})

    basketModel.belongsTo(productModel, {foreignKey: "productId", targetKey: "id", as: "product",})
    basketModel.belongsTo(usersModel, {foreignKey: "userId", targetKey: "id", as: "user",})
    basketModel.belongsTo(productColorModel, {foreignKey: "colorId", targetKey: "id", as: "color",})
    basketModel.belongsTo(productSizeModel, {foreignKey: "sizeId", targetKey: "id", as: "size",})
    basketModel.belongsTo(discountModel, {foreignKey: "discountId", targetKey: "id", as: "discount",})

    await sequelizeConfig.sync({alter: true})

    // await refreshTokenModel.sync()
}