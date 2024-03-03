import Usuario from "../models/usuario"

export class UsuarioController {
  static async get(req, res) {
    const users = await Usuario.findAll()
    return res.json(users)
  }

  static async post(req, res) {
    const newUser = await Usuario.create(req.body)
    return res.json(newUser)
  }

  static put(req, res) {
    return res.json('PUT')
  }

  static delete(req, res) {
    return res.json('DELETE')
  }
}