import { UsuarioService } from "../services/usuario"

export class UsuarioController {
  _service = new UsuarioService()

  async create(req, res) {
    // const novoUsuario = await this._service.create(req.body)
    // console.log(req.body)
    return res.status(201).json(req.body)
    // res.status(201).json('ok')
  }
}