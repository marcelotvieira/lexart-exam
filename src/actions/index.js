const baseHeaders = { 'Content-Type': 'application/json' }

export const signin = async (payload) => await fetch(
  '/api/usuario?action=signin',
  {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify(payload)
  }
)

export const register = async (payload) => await fetch(
  '/api/usuario?action=register',
  {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify(payload)
  }
)

export const createProduct = async (payload) => await fetch(
  '/api/produto',
  {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify(payload)
  }
)