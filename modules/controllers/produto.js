import { Data, Produto } from "../models/produto"

export class ProdutoController {

  static async post(req, res) {
    const payload = req.body
    const newProduct = await Produto.create(payload, {
      include: [Data]
    })
    res.status(201).json(newProduct)
  }
}