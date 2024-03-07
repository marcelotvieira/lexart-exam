import Cookies from "js-cookie"

export const signin = async (payload) => await fetch(
  '/api/usuario?action=signin',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'authorization': Cookies.get('authToken') },
    body: JSON.stringify(payload)
  }
)

export const register = async (payload) => await fetch(
  '/api/usuario?action=register',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'authorization': Cookies.get('authToken') },
    body: JSON.stringify(payload)
  }
)

export const createProduct = async (payload) => await fetch(
  '/api/produto',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'authorization': Cookies.get('authToken') },
    body: JSON.stringify(payload)
  }
)

export const getProducts = async (params) => await fetch(
  `/api/produto?${(new URLSearchParams(params)).toString()}`,
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'authorization': Cookies.get('authToken') },
  }
)

export const getProductDetails = async (id) => await fetch(
  `/api/produto/${Number(id)}`,
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'authorization': Cookies.get('authToken') },
  }
)

export const updateProduct = async (id, payload) => await fetch(
  `/api/produto/${Number(id)}`,
  {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'authorization': Cookies.get('authToken') },
    body: JSON.stringify(payload)
  }
)

export const deleteProduct = async (id) => await fetch(
  `/api/produto/${Number(id)}`,
  {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'authorization': Cookies.get('authToken') },
    // body: {}
  }
)