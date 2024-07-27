'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProdxPedido extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  ProdxPedido.init({
    idprod: DataTypes.INTEGER,
    idpedido: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    precio: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ProdxPedido',
    tableName: 'prodxpedidos'
  });
  return ProdxPedido;
};
