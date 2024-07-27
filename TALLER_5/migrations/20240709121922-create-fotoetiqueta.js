'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear la tabla 'fotoetiquetas'
    await queryInterface.createTable('fotoetiquetas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      foto_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'fotos', // Nombre de la tabla referenciada
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      etiqueta_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'etiquetas', // Nombre de la tabla referenciada
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    // Obtener IDs de 'fotos' y 'etiquetas'
    let [fotos, fotos_metadata] = await queryInterface.sequelize.query('SELECT id FROM fotos');
    let [etiquetas, etiquetas_metadata] = await queryInterface.sequelize.query('SELECT id FROM etiquetas');

    // Insertar datos en 'fotoetiquetas'
    await queryInterface.bulkInsert('fotoetiquetas', [
      { foto_id: fotos[0].id, etiqueta_id: etiquetas[0].id, createdAt: new Date(), updatedAt: new Date() },
      { foto_id: fotos[0].id, etiqueta_id: etiquetas[1].id, createdAt: new Date(), updatedAt: new Date() },
      { foto_id: fotos[1].id, etiqueta_id: etiquetas[1].id, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fotoetiquetas', null, {});
    await queryInterface.dropTable('fotoetiquetas');
  }
};
