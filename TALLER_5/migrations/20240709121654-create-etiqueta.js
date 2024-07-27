'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear la tabla 'etiquetas'
    await queryInterface.createTable('etiquetas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      texto: {
        type: Sequelize.STRING,
        allowNull: false
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

    // Insertar etiquetas en la tabla 'etiquetas'
    let etiquetas = ['foto', 'payaso', 'rojo', 'azul', 'techo', 'cielo', 'foco', 'luz'];
    for (let etiqueta of etiquetas) {
      await queryInterface.bulkInsert('etiquetas', [{
        texto: etiqueta,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    }
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('etiquetas', null, {});
    await queryInterface.dropTable('etiquetas');
  }
};
