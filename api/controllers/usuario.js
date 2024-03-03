import { UsuarioService } from "../services/usuario"

export class UsuarioController {
  _service = new UsuarioService()

  async create(req, res) {
    const novoUsuario = await this._service.create(req.body)
    res.status(201).json(novoUsuario)
  }
}