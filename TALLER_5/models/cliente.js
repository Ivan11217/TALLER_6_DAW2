'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      Cliente.belongsToMany(models.Servicio, { through: 'ServicioCliente', foreignKey: 'clienteId', as: 'servicios' });
    }
  }
  Cliente.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    cedula: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cliente',
    tableName: 'clientes'
  });
  return Cliente;
};
