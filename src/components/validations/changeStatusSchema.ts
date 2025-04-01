import Joi from "joi";

export const changeStatusSchema = (Joi.object({
    status: Joi.string().valid("to do", "in progress", "completed").default("to Do"),
})
);