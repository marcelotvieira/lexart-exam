import * as bcrypt from 'bcrypt'
import { ApiError } from '../error/ApiError'
import Usuario from "../models/usuario"
import { gerarToken } from '../utils/jwt'

export class UsuarioController {

  static async register(req, res) {
    const senha = await bcrypt.hash(req.body.senha, 10)
    const newUser = await Usuario.create({ ...req.body, senha })

    return res.status(201).json({
      message: 'CREATED',
      usuario: { id: newUser.id }
    })
  }

  static async signin(req, res) {
    const { email, senha } = req.body
    const usuario = await Usuario.findOne({
      where: { email },
    })
    if (!usuario) return ApiError.badRequest("Credenciais inválidas")
    const match = await bcrypt.compare(senha, usuario.senha)
    if (match) return res.status(200).json({
      token: gerarToken({ email: usuario.email })
    })

    return ApiError.badRequest("Credenciais inválidas")
  }
}