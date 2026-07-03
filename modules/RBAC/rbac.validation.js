import {Joi, validate} from "express-validation";

const rbacRoleValidation = validate({
    body: Joi.object({
        title: Joi.string().required().empty().label("عنوان")
            .messages({
                'string.base': 'عنوان باید متن باشد',
                'any.required': 'عنوان الزامی است',
                "string.empty": "عنوان نمیتواند خالی باشد",
            }),
        description: Joi.string().required().empty().label("توضیحات")
            .messages({
                'string.base': 'توضیحات باید متن باشد',
                'any.required': 'توضیحات الزامی است',
                "string.empty": "توضیحات نمیتواند خالی باشد",
            }),

    })
})

const rbacPermissionValidation = validate({
    body: Joi.object({
        title: Joi.string().required().empty().label("عنوان")
            .messages({
                'string.base': 'عنوان باید متن باشد',
                'any.required': 'عنوان الزامی است',
                "string.empty": "عنوان نمیتواند خالی باشد",
            }),
        description: Joi.string().required().empty().label("توضیحات")
            .messages({
                'string.base': 'توضیحات باید متن باشد',
                'any.required': 'توضیحات الزامی است',
                "string.empty": "توضیحات نمیتواند خالی باشد",
            }),

    })
})

export {rbacRoleValidation, rbacPermissionValidation}