'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FotoEtiqueta extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  FotoEtiqueta.init({
    foto_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'fotos',
        key: 'id'
      }
    },
    etiqueta_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'etiquetas',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'fotoetiqueta',
    tableName: 'fotoetiquetas',
  });
  return FotoEtiqueta;
};
