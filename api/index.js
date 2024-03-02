import e from 'express'
import { ApiError } from './error/ApiError'
import usuarioRouter from './routes/usuario'
const app = e()

app.get('/api/health', (req, res) => res.json('ok'))

app.use(usuarioRouter)
app.use(ApiError.handler)
app.listen()

export default app