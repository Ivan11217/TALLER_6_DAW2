'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProdxPedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idprod: {
        type: Sequelize.INTEGER
      },
      idpedido: {
        type: Sequelize.INTEGER
      },
      cantidad: {
        type: Sequelize.INTEGER
      },
      precio: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProdxPedidos');
  }
};