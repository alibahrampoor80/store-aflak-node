import {Joi, validate} from "express-validation";

const canceledValidation = validate({
    body: Joi.object({
        reason: Joi.string().required().empty().label("دلیل")
            .messages({
                'string.base': 'دلیل باید متن باشد',
                'any.required': 'دلیل الزامی است',
                "string.empty": "دلیل نمیتواند خالی باشد",
            }),

    })
})

export {canceledValidation}