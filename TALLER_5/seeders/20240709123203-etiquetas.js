'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const etiquetas = [
      { texto: 'foto', createdAt: new Date(), updatedAt: new Date() },
      { texto: 'payaso', createdAt: new Date(), updatedAt: new Date() },
      { texto: 'rojo', createdAt: new Date(), updatedAt: new Date() },
      { texto: 'azul', createdAt: new Date(), updatedAt: new Date() },
      { texto: 'techo', createdAt: new Date(), updatedAt: new Date() },
    ];
    
    await queryInterface.bulkInsert('etiquetas', etiquetas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('etiquetas', null, {});
  }
};
