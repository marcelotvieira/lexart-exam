import sequelize from "../../config/dbContext";
import Usuario from "../models/usuario";

export class UsuarioService {
  _model = Usuario

  async create(data) {
    const novoUsuario = await this._model.create(data)
    sequelize.close()
    return novoUsuario
  }
}