import Joi from "joi";

const clientSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required().min(10).max(11),
    cpf:Joi.string().required().min(11).max(11),
    birthday:Joi.string().required()
});

export default clientSchema;