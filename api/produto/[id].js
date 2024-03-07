import bodyParser from 'body-parser'
import e from 'express'
import rescue from 'express-rescue'
import { ProdutoController } from '../../modules/controllers/produto'
import { ApiError } from '../../modules/error/ApiError'
import { validateJwt } from '../../modules/middlewares/validateJwt'
import { validateProductUpdateSchemas } from '../../modules/middlewares/validateSchemas'

const app = e()
app.use(bodyParser.json())

app.put(
  '/api/produto/:id',
  rescue(validateProductUpdateSchemas),
  rescue(validateJwt),
  rescue((req, res) =>
    ProdutoController.put(req, res)
  ))

app.get(
  '/api/produto/:id',
  rescue(validateJwt),
  rescue((req, res) =>
    ProdutoController.getOne(req, res)
  ))

app.delete(
  '/api/produto/:id',
  rescue(validateJwt),
  rescue((req, res) =>
    ProdutoController.delete(req, res)
  ))



app.use(ApiError.handler)

export default app
