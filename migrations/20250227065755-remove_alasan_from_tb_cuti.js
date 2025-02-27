"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("tb_cuti", "alasan");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("tb_cuti", "alasan", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },
};
