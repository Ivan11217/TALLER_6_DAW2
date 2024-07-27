'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Foto extends Model {
    static associate(models) {
      Foto.belongsToMany(models.etiqueta, { through: 'fotoetiquetas', foreignKey: 'foto_id', as: 'etiquetas' });
    }
  }
  Foto.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    calificacion: DataTypes.FLOAT,
    ruta: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'foto',
    tableName: 'fotos'
  });
  return Foto;
};
