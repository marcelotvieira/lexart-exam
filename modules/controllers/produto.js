import { Op } from "sequelize"
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

  static async get(req, res) {
    const { nome, marca } = req.query

    const where = {
      ...(nome && { name: { [Op.iLike]: `%${nome}%` } }),
      ...(marca && { brand: marca }),
    };

    const rows = await Produto.findAll({
      where,
      include: [Data]
    })

    const brandsSet = await Produto.findAll({
      attributes: ['brand'],
      group: ['brand']
    });

    res.status(200).json({
      products: rows,
      brands: brandsSet.map(item => item.brand),
    })
  }
}