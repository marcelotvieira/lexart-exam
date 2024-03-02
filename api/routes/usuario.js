import { Router } from "express";
import rescue from "express-rescue";
import { UsuarioController } from "../controllers/usuario";

const usuarioRouter = Router()
const ctlr = new UsuarioController()

usuarioRouter.post(
  '/api/usuario',
  rescue((req, res) => ctlr.create(req, res)),
)

export default usuarioRouter