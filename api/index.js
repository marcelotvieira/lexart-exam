import bodyParser from 'body-parser'
import e from 'express'
import { ApiError } from './error/ApiError'
import usuarioRouter from './routes/usuario'
const app = e()

app.use(bodyParser.json())

app.get('/api/health', (req, res) => res.json({ status: 'OK' }))

// ROUTES
app.use(usuarioRouter)

app.use(ApiError.handler)

app.listen()

export default app