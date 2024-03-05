import e from 'express'
import rescue from 'express-rescue'
import { UsuarioController } from '../modules/controllers/usuario'
import { ApiError } from '../modules/error/ApiError'
import { validateActionMiddleware } from '../modules/middlewares/validateAction'

const app = e()
// app.use(bodyParser.json())

app.post(
  '/api/usuario', // ?action=<register | signin>
  validateActionMiddleware,
  rescue((req, res) =>
    UsuarioController[req.query.action](req, res)
  ))

app.use(ApiError.handler)

export default app
