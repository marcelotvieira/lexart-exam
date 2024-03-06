import Joi from "joi";

export const produtoSchemas = {
  struct1: Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    model: Joi.string().required(),
    price: Joi.number().required(),
    color: Joi.string().required()
  }),

  struct2: Joi.object({
    name: Joi.string().required(),
    details: Joi.object({
      brand: Joi.string().required(),
      model: Joi.string().required(),
      color: Joi.string().required()
    }),
    price: Joi.number().required()
  }),

  struct3: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      brand: Joi.string().required(),
      model: Joi.string().required(),
      data: Joi.array().items(
        Joi.object({
          price: Joi.number().required(),
          color: Joi.string().required()
        })
      )
    })
  ),
  struct0: Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    model: Joi.string().required(),
    data: Joi.array().items(
      Joi.object({
        price: Joi.number().required(),
        color: Joi.string().required()
      })
    )
  })
}
