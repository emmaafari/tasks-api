import Joi from 'joi';

export const validateTask = (task) => {
    const taskSchema = Joi.object({
        name: Joi.string().min(3).required(),
        completed: Joi.bool().required()
    });
    
    const {error} = taskSchema.validate({ name: task.name, completed: task.completed });
    
    if (error) {
        return error.details[0].message;
    }
}