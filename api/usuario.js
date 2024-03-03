import e from 'express'
import rescue from 'express-rescue'
import { UsuarioController } from '../modules/controllers/usuario'
import { ApiError } from '../modules/error/ApiError'

const app = e()

// statics
app.all(
  '/api/usuario',
  rescue((req, res) =>
    UsuarioController[req.method.toLowerCase()](req, res)
  ))

app.use(ApiError.handler)

export default app