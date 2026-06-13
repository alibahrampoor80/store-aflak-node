import {Joi, validate} from "express-validation";
import {productType} from "../../common/constant/product.const.js";

const createProductValidation = validate({
    body: Joi.object({
        title: Joi.string().required().label("عنوان").messages({
            'string.base': 'عنوان باید متن باشد',
            'any.required': 'عنوان الزامی است'
        }),
        description: Joi.string().required(),
        type: Joi.string().valid(...Object.values(productType)).required(),
        price: Joi.number().optional().allow(null),
        discount: Joi.number().optional().allow(null),
        active_discount: Joi.boolean().optional().allow(null),
        count: Joi.number().optional().allow(null),
        details: Joi.array().items(
            Joi.object({
                key: Joi.string().required(),
                value: Joi.string().required(),
            })
        ).optional(),
        colors: Joi.when('type', {
            is: 'coloring',
            then: Joi.array().items(
                Joi.object({
                    name: Joi.string().required(),
                    code: Joi.string().required(),
                    price: Joi.number().required(),
                    discount: Joi.number().optional().allow(null),
                    active_discount: Joi.boolean().optional().allow(null),
                    count: Joi.number().required(),
                })
            ).required(),
            otherwise: Joi.forbidden()
        }),

        sizes: Joi.when('type', {
            is: 'sizing',
            then: Joi.array().items(
                Joi.object({
                    size: Joi.string().required(),
                    price: Joi.number().required(),
                    discount: Joi.number().optional().allow(null),
                    active_discount: Joi.boolean().optional().allow(null),
                    count: Joi.number().required(),
                })
            ).required(),
            otherwise: Joi.forbidden()
        }),
        // colors: Joi.array().items(
        //     Joi.object({
        //         name: Joi.string().required(),
        //         code: Joi.string().required(),
        //         price: Joi.number().required(),
        //         discount: Joi.number().optional().allow(null),
        //         active_discount: Joi.boolean().optional().allow(null),
        //         count: Joi.number().required(),
        //     })
        // ).optional(),
        // sizes: Joi.array().items(
        //     Joi.object({
        //         size: Joi.string().required(),
        //         price: Joi.number().required(),
        //         discount: Joi.number().optional().allow(null),
        //         active_discount: Joi.boolean().optional().allow(null),
        //         count: Joi.number().required(),
        //     })
        // ).optional(),

    })
})
export {createProductValidation}