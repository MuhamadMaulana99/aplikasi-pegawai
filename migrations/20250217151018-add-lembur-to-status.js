"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Modify the enum column by adding the value 'lembur'
    await queryInterface.changeColumn("tb_absensi", "status", {
      type: Sequelize.ENUM("Hadir", "Izin", "Sakit", "Alpha", "Telat", "lembur"),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // If we rollback, we remove 'lembur' from the ENUM
    await queryInterface.changeColumn("tb_absensi", "status", {
      type: Sequelize.ENUM("Hadir", "Izin", "Sakit", "Alpha", "Telat"),
      allowNull: false,
    });
  },
};
