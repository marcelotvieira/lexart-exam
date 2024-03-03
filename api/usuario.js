import e from 'express'
import rescue from 'express-rescue'
import { UsuarioController } from '../modules/controllers/usuario'
import { ApiError } from '../modules/error/ApiError'
export const config = {
  api: {
    externalResolver: true,
    bodyParser: true,
  },
}
const app = e()

// app.use(bodyParser.json())
// statics
app.all(
  '/api/usuario',
  rescue((req, res) =>
    UsuarioController[req.method.toLowerCase()](req, res)
  ))

app.use(ApiError.handler)



export default app

// > POST /api/usuario HTTP/1.1
// > Host: localhost:3000
// > Content-Type: application/json
// > User-Agent: insomnia/8.4.5
// > Accept: */*
// > Content-Length: 69