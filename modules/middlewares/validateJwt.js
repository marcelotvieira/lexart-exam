import { ApiError } from "../error/ApiError"
import { verificarToken } from "../utils/jwt"

const message = {
  erro: "Não autorizado!",
  description: "Token 'Authorization' requerido.",
  gettingAcces: "Registre-se em: '/api/usuario?action=register'",
  gettingToken: "Solicite o token fazendo login em '/api/usuario?action=signin",
}

export async function validateJwt(req, res, next) {
  const Authorization = req.get('Authorization')
  if (!Authorization || !verificarToken(Authorization))
    return ApiError.unauthorized(message)
  next()
}