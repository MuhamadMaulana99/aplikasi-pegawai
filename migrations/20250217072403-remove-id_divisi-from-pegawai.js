"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("tb_pegawai", "id_divisi");
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("tb_pegawai", "id_divisi", {
      type: Sequelize.INTEGER,
      allowNull: false,
      // Jika perlu, tambahkan constraint foreign key:
      references: {
        model: "tb_divisi",
        key: "id_divisi",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
};
