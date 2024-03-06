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

