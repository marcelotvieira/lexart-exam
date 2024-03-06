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