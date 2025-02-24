"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("tb_gaji", "tunjangan", "bonusAdon");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("tb_gaji", "bonusAdon", "tunjangan");
  },
};
