import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from '../../data/dbContext';

class Data extends Model { }

Data.init({
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, { sequelize })

class Produto extends Model { }

Produto.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize })

Produto.Data = Produto.hasMany(Data)

export { Data, Produto };

