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
    const { nome, marca, page } = req.query;

    const where = {};
    if (nome) where.name = { [Op.iLike]: `%${nome}%` };
    if (marca) where.brand = marca;

    const limit = 6;
    const offset = page ? (Number(page) - 1) * limit : 0;

    const [rows, totalCount, brandsSet] = await Promise.all([
      Produto.findAll({
        where,
        include: [Data],
        offset,
        limit,
      }),
      Produto.count({ where }),
      Produto.findAll({
        attributes: ['brand'],
        group: ['brand']
      })
    ]);

    const brands = brandsSet.map(item => item.brand);

    return res.status(200).json({ products: rows, brands, total: totalCount });
  }

}