'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Servicio extends Model {
    static associate(models) {
      Servicio.belongsToMany(models.Cliente, {
        through: 'servicioclientes',
        foreignKey: 'servicioId',
        otherKey: 'clienteId',
        as: 'clientes'
      });
    }
  }
  Servicio.init({
    descripcion: DataTypes.STRING,
    precio: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Servicio',
    tableName: 'servicios'
  });
  return Servicio;
};
