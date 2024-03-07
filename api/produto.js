import bodyParser from 'body-parser'
import e from 'express'
import rescue from 'express-rescue'
import { ProdutoController } from '../modules/controllers/produto'
import { ApiError } from '../modules/error/ApiError'
import { validateJwt } from '../modules/middlewares/validateJwt'
import { validateProductSchemas } from '../modules/middlewares/validateSchemas'


const app = e()
app.use(bodyParser.json())

app.post(
  '/api/produto',
  rescue(validateProductSchemas),
  rescue(validateJwt),
  rescue((req, res) =>
    ProdutoController.post(req, res)
  ))

app.get(
  '/api/produto',
  rescue(validateJwt),
  rescue(((req, res) =>
    ProdutoController.get(req, res)))
)

app.use(ApiError.handler)

export default app
