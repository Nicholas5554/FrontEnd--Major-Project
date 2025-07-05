import Joi from "joi";

export const editUserSchema = Joi.object({
    name: Joi.object()
        .keys({
            first: Joi.string().min(2).message("First name must be at least 2 letters long").max(256).required().messages({
                "string.empty": "First name is required",
            }),
            last: Joi.string().min(2).message("Last name must be at least 2 letters long").max(256).required().messages({
                "string.empty": "Last name is required",
            }),
        })
        .required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .message("Please enter a valid email address")
        .required()
        .messages({
            "string.email": "Please enter a valid email address",
            "string.empty": "Email is required",
            "any.required": "Email is required"
        }),
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
