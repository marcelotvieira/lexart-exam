import { Data, Produto } from "../models/produto"

export class ProdutoController {

  static struct1(data) {
    return { ...data, Data: [{ price: data.price, color: data.color }] }
  }

  static struct2(data) {
    const { details: { brand, model, color } } = data
    return {
      name: data.name,
      brand,
      model,
      Data: [{ color, price: data.price }]
    }
  }

  static struct3(data) {
    return data.map((p) => ({ ...p, Data: p.data, data: undefined }))
  }

  static struct0(data) {
    return { ...data, Data: data.data, data: undefined }
  }

  static async post(req, res) {
    const payload = this[req.schema](req.body)
    const newProduct = await Produto[req.schema === 'struct3' ? 'bulkCreate' : 'create'](payload, {
      include: [Data]
    })
    return res.status(201).json(newProduct)
  }
}