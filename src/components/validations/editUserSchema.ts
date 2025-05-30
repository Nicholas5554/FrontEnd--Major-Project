import Joi from "joi";

export const editUserSchema = Joi.object({
    name: Joi.object()
        .keys({
            first: Joi.string().min(2).max(256).required(),
            middle: Joi.string().min(2).max(256).allow(""),
            last: Joi.string().min(2).max(256).required(),
        })
        .required(),

    phone: Joi.string()
        .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
        .rule({ message: 'user "phone" mast be a valid phone number' })
        .required(),

    image: Joi.object()
        .keys({
            url: Joi.string()
                .uri()
                .rule({ message: "user image mast be a valid url" })
                .allow(""),
            alt: Joi.string().min(2).max(256).allow(""),
        })
        .required(),

    address: Joi.object()
        .keys({
            country: Joi.string().required(),
            city: Joi.string().required(),
            street: Joi.string().required(),
            houseNumber: Joi.number().required(),
        })
        .required(),
});
