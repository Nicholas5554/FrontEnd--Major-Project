import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } })
        .ruleset.pattern(
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        )
        .rule({ message: 'email must be a valid email' })
        .required(),

    password: Joi.string()
        .ruleset.regex(
            /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
        )
        .rule({
            message:
                'password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*-)'
        })
        .required(),
})