"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("tb_gaji", "gaji_pokok");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("tb_gaji", "gaji_pokok", {
      type: Sequelize.FLOAT,
      allowNull: false,
    });
  },
};
