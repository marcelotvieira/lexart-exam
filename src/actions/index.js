export const signin = async (payload) => await fetch(
  '/api/usuario?action=signin',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }
)

export const register = async (payload) => await fetch(
  '/api/usuario?action=register',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }
)