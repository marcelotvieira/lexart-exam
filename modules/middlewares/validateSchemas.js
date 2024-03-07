import { produtoSchemas } from "../validations/produto";

export function validateProductSchemas(req, res, next) {
  let errors = [];
  for (const struct of Object.keys(produtoSchemas)) {
    const { error } = produtoSchemas[struct].validate(req.body);
    if (!error) {
      req.schema = struct;
      return next();
    }
    errors.push(`Erro na estrutura ${struct}: ${error.message}`);
  }

  return res.status(400).json({
    message: 'Erro',
    details: errors,
  });
}

export function validateProductUpdateSchemas(req, res, next) {
  const { error } = produtoSchemas.struct0.validate(req.body);
  if (!error)
    return next()
  return res.status(400).json({
    message: 'Erro',
    details: error.message,
  });
}