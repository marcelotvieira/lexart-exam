import e from 'express'
import rescue from 'express-rescue'
import { ProdutoController } from '../../modules/controllers/produto'
import { ApiError } from '../../modules/error/ApiError'
import { validateProductSchemas } from '../../modules/middlewares/validateSchemas'

const app = e()
// app.use(bodyParser.json())

app.put(
  '/api/produto/:id',
  validateProductSchemas,
  rescue((req, res) =>
    ProdutoController.put(req, res)
  ))



app.use(ApiError.handler)

export default app
