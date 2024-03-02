import { UsuarioService } from "../services/usuario"

export class UsuarioController {
  _service = new UsuarioService()

  async create(req, res) {
    console.log(req.body)
    // const novoUsuario = await this._service.create(req.body)
    res.status(201).json(req.body)
  }
}