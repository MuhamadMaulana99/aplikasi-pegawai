"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("tb_gaji", "lembur", {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: 0,
      after: "potongan", // Menambahkan setelah kolom "potongan"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("tb_gaji", "lembur");
  },
};
