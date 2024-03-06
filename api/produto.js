import bodyParser from 'body-parser'
import e from 'express'
import rescue from 'express-rescue'
import { ProdutoController } from '../modules/controllers/produto'
import { ApiError } from '../modules/error/ApiError'
import { validateProductSchemas } from '../modules/middlewares/validateSchemas'

const app = e()
app.use(bodyParser.json())

app.all(
  '/api/produto',
  validateProductSchemas,
  // validateActionMiddleware,
  rescue((req, res) =>
    ProdutoController[req.method.toLowerCase()](req, res)
  ))

app.use(ApiError.handler)

export default app
