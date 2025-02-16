"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tb_cuti", {
      id_cuti: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_pegawai: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tb_pegawai",
          key: "id_pegawai",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      tanggal_mulai: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      tanggal_selesai: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      jenis_cuti: {
        type: Sequelize.ENUM("Tahunan", "Sakit", "Melahirkan", "Lainnya"),
        allowNull: false,
      },
      alasan: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("Diajukan", "Disetujui", "Ditolak"),
        allowNull: false,
        defaultValue: "Diajukan",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tb_cuti");
  },
};
