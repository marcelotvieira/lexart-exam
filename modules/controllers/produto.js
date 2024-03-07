import { Op } from "sequelize"
import { ApiError } from "../error/ApiError"
import { Data, Produto } from "../models/produto"

export class ProcessProduto {
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
}
export class ProdutoController {

  //PUT
  static async put({ params, body, schema }, res) {
    const payload = { ...body, Data: body.data, data: undefined }
    try {
      const product = await Produto.findByPk(Number(params.id), { include: Data });

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: 'Produto não encontrado.' });
      }
      await product.update({
        name: payload.name,
        brand: payload.brand,
        model: payload.model
      });

      await Data.destroy({ where: { ProdutoId: product.id } });

      if (payload.Data && payload.Data.length > 0) {
        await Promise.all(payload.Data.map(async (variation) => {
          await Data.create({ ...variation, ProdutoId: product.id });
        }));
      }

      return res.status(200).json({ message: 'UPDATED', detials: 'Produto atualizado com sucesso.' });
    } catch (error) {
      console.error('Erro ao atualizar o produto:', error);
      return res.status(500).json({ message: 'Erro', details: error });
    }
  }


  //POST
  static async post(req, res) {
    const payload = ProcessProduto[req.schema](req.body)
    const newProduct = await Produto[req.schema === 'struct3' ? 'bulkCreate' : 'create'](payload, {
      include: [Data]
    })
    return res.status(201).json(newProduct)
  }

  //DELETE
  static async delete({ params }, res) {
    if (!params.id) return ApiError.badRequest("Id inválido")
    const destroyed = await Produto.destroy({
      where: { id: Number(params.id) }
    })
    if (destroyed < 1) return ApiError.notFound("Produto não encontrado")
    return res.status(204).send()
  }

  //GET:id
  static async getOne({ params }, res) {
    const product = await Produto.findByPk(Number(params.id), { include: [Data] })
    if (!product) return ApiError.badRequest("Produto não encontrado")
    return res.status(200).json(product)
  }

  //GET
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