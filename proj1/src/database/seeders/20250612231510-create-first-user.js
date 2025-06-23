'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [{
      nome: 'Admin',
      email: 'admin@example.com',
      senha: await bcrypt.hash('123456', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', { email: 'admin@example.com' }, {});
  }
};
