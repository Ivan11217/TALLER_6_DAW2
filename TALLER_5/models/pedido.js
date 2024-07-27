'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    static associate(models) {
      Pedido.belongsTo(models.Cliente, { foreignKey: 'idcliente' });
      Pedido.belongsToMany(models.Producto, { through: models.ProdxPedido, foreignKey: 'idpedido' });
    }
  }
  Pedido.init({
    fecha: DataTypes.DATE,
    idcliente: DataTypes.INTEGER,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pedido',
    tableName: 'pedidos'
  });
  return Pedido;
};
