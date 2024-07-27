'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Etiqueta extends Model {
    static associate(models) {
      Etiqueta.belongsToMany(models.foto, { through: 'fotoetiquetas', foreignKey: 'etiqueta_id', as: 'fotos' });
    }
  }
  Etiqueta.init({
    texto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'etiqueta',
    tableName: 'etiquetas'
  });
  return Etiqueta;
};
