'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
      Producto.belongsToMany(models.Pedido, { through: models.ProdxPedido, foreignKey: 'idprod' });
    }
  }
  Producto.init({
    descrip: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    precio: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Producto',
    tableName: 'productos'
  });
  return Producto;
};
