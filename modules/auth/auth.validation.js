import {Joi, validate} from "express-validation";

const sendOtpValidation = validate({
    body: Joi.object({
        mobile: Joi.string()
            .length(11)
            .pattern(/^09[0-9]{9}$/)
            .required()
            .empty()
            .messages({
                "string.base": "شماره موبایل باید یک متن باشد",
                "string.length": "شماره موبایل باید 11 رقم باشد",
                "string.empty": "شماره موبایل نمیتواند خالی باشد",
                "string.pattern.base": "شماره موبایل معتبر ایران نیست (باید با 09 شروع شود)",
                "any.required": "شماره موبایل الزامی است"
            })
    })
});

const checkOtpValidation = validate({
    body: Joi.object({
        mobile: Joi.string()
            .length(11)
            .pattern(/^09[0-9]{9}$/)
            .required()
            .empty()
            .messages({
                "string.base": "شماره موبایل باید یک متن باشد",
                "string.length": "شماره موبایل باید 11 رقم باشد",
                "string.empty": "شماره موبایل نمیتواند خالی باشد",
                "string.pattern.base": "شماره موبایل معتبر ایران نیست (باید با 09 شروع شود)",
                "any.required": "شماره موبایل الزامی است"
            }),
        code: Joi.string().required().length(5)
            .messages({
                "string.base": "کد باید یک متن باشد",
                "string.length": "کد باید 5 رقم باشد",
                "string.empty": "کد نمیتواند خالی باشد",
                "any.required": "کد الزامی است"
            })
    })
});

export {sendOtpValidation, checkOtpValidation}