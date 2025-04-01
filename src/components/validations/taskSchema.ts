import Joi from "joi"

export const TaskSchema = Joi.object({
    title: Joi.string().min(3).required(),
    type: Joi.string().min(3).required(),
    assignedTo: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    status: Joi.string().valid("to do", "in progress", "completed").required(),
    priority: Joi.string().valid("low", "medium", "high", "urgent").required(),
    description: Joi.string().min(3).required(),
    user_id: Joi.string().allow(""),
})