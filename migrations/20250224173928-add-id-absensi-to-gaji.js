"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("tb_gaji", "id_absensi", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "tb_absensi", // Tabel yang direferensikan
        key: "id_absensi",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("tb_gaji", "id_absensi");
  },
};
