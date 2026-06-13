import {sequelizeConfig} from "../../config/sequelize.config.js";
import {DataTypes} from "@sequelize/core";
import {productType} from "../../common/constant/product.const.js";


const productModel = sequelizeConfig.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2), allowNull: true
    },
    discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    active_discount: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    type: {
        type: DataTypes.ENUM(...Object.values(productType))
    },
    count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {modelName: 'product', timestamps: true, createdAt: "created_at", updatedAt: "updated_at"})

const productDetailModel = sequelizeConfig.define('product_detail', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true,},
    key: {type: DataTypes.STRING(150)},
    value: {type: DataTypes.STRING(150)},
    productId: {type: DataTypes.INTEGER},
}, {modelName: 'product_detail', timestamps: true, createdAt: "created_at", updatedAt: "updated_at"})

const productColorModel = sequelizeConfig.define('product_color', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true,},
    color_name: {type: DataTypes.STRING(200)},
    color_code: {type: DataTypes.STRING(250)},
    productId: {type: DataTypes.INTEGER},
    count: {type: DataTypes.INTEGER, defaultValue: 0},
    price: {type: DataTypes.DECIMAL(10, 2), defaultValue: 0},
    discount: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: true},
    active_discount: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: true},
}, {modelName: "product_color", timestamps: true, createdAt: "created_at", updatedAt: "updated_at"})

const productSizeModel = sequelizeConfig.define('product_size', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true,},
    size: {type: DataTypes.STRING(200)},
    productId: {type: DataTypes.INTEGER},
    count: {type: DataTypes.INTEGER, defaultValue: 0},
    price: {type: DataTypes.DECIMAL(10, 2), defaultValue: 0},
    discount: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: true},
    active_discount: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: true},
}, {modelName: "product_size", timestamps: true, createdAt: "created_at", updatedAt: "updated_at"})

export {productModel, productDetailModel, productColorModel, productSizeModel}
