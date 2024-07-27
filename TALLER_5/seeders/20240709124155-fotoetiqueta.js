'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fotoetiquetas = [];
    
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 5; j++) {
        fotoetiquetas.push({
          foto_id: i,
          etiqueta_id: j,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }
    
    await queryInterface.bulkInsert('fotoetiquetas', fotoetiquetas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('fotoetiquetas', null, {});
  }
};
