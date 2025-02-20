"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adding the 'is_tanggal_merah' column
    await queryInterface.addColumn("tb_absensi", "is_tanggal_merah", {
      type: Sequelize.BOOLEAN,
      allowNull: true, // Set to false if you want this field to be required
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Reverting the 'is_tanggal_merah' column
    await queryInterface.removeColumn("tb_absensi", "is_tanggal_merah");
  },
};
