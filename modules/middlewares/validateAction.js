import { ApiError } from "../error/ApiError";
import { usuarioSchemas } from "../validations/usuario";

export function validateActionMiddleware(req, res, next) {
  const action = req.query.action

  if (!Object.keys(usuarioSchemas).includes(action)) {
    return ApiError.badRequest("Ação inválida");
  }

  const { error } = usuarioSchemas[action].validate(req.body);
  if (error) {
    return res.status(400).json(
      {
        message: 'Erro',
        details: error.details[0].message,
      });
  }
  next();
}