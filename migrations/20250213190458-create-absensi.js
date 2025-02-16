"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tb_absensi", {
      id_absensi: {
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
      tanggal: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      jam_masuk: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      jam_keluar: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("Hadir", "Izin", "Sakit", "Alpha"),
        allowNull: false,
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
    await queryInterface.dropTable("tb_absensi");
  },
};
