import Joi from "joi";

export const editUserSchema = Joi.object({
    name: Joi.object()
        .keys({
            first: Joi.string().min(2).max(256).required(),
            last: Joi.string().min(2).max(256).required(),
        })
        .required(),
    password: Joi.string()
        .ruleset.regex(
            /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
        )
        .rule({
            message:
                'password must be 6+ characters, include uppercase, lowercase, number, and special character (!@#$%^&*-)',
        })
        .required(),
});
