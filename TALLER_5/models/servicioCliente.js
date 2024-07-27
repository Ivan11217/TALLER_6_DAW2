'use strict';

module.exports = (sequelize, DataTypes) => {
  const ServicioCliente = sequelize.define('ServicioCliente', {
    clienteId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    servicioId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    }
  }, {
    tableName: 'servicioclientes',
    timestamps: false,
  });

  return ServicioCliente;
};
