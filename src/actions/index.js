import Cookies from "js-cookie"

const token = Cookies.get('authToken')
const baseHeaders = { 'Content-Type': 'application/json', 'Authorization': token }


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

export const getProducts = async (params) => await fetch(
  `/api/produto?${(new URLSearchParams(params)).toString()}`,
  {
    method: 'GET',
    headers: baseHeaders,
  }
)

export const getProductDetails = async (id) => await fetch(
  `/api/produto/${Number(id)}`,
  {
    method: 'GET',
    headers: baseHeaders,
  }
)

export const updateProduct = async (id, payload) => await fetch(
  `/api/produto/${Number(id)}`,
  {
    method: 'PUT',
    headers: baseHeaders,
    body: JSON.stringify(payload)
  }
)

export const deleteProduct = async (id) => await fetch(
  `/api/produto/${Number(id)}`,
  {
    method: 'DELETE',
    headers: baseHeaders,
    body: {}
  }
)