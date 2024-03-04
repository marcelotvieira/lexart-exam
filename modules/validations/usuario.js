import Joi from "joi";

export const usuarioSchemas = {
  register: Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required()
  }),
  signin: Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required()
  })
}

export function validateAction(action, data) {
  const { error, value } = usuarioSchemas[action].validate(data);
  if (error) {
    throw new Error({ message: error.details[0].message });
  }
  return value;
}