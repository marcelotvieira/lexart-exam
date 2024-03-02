import e from 'express'

const app = e()

app.get('/api/health', (req, res) => res.json('ok'))

export default app