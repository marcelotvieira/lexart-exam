module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
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
  });

  Produto.associate = (models) => {
    Produto.hasMany(models.Data, {
      foreignKey: 'ProdutoId',
      as: 'data'
    });
  };
  return Produto;
};
