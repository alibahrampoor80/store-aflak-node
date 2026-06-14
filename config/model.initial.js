import {sequelizeConfig} from "./sequelize.config.js";
import {
    productColorModel,
    productDetailModel,
    productModel,
    productSizeModel
} from "../modules/product/product.model.js";

export async function modelInitial() {
    productModel.hasMany(productDetailModel, {foreignKey: 'productId', sourceKey: "id", as: "details",})
    productDetailModel.belongsTo(productModel, {foreignKey: "productId", targetKey: "id",})

    productModel.hasMany(productColorModel, {foreignKey: "productId", sourceKey: "id", as: "colors"})
    productColorModel.belongsTo(productModel, {foreignKey: "productId", targetKey: "id"})

    productModel.hasMany(productSizeModel, {foreignKey: "productId", sourceKey: "id", as: "sizes"})
    productSizeModel.belongsTo(productModel, {foreignKey: "productId", targetKey: "id"})

    // await sequelizeConfig.sync({force: true})
}