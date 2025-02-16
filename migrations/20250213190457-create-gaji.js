"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tb_gaji", {
      id_gaji: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_pegawai: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tb_pegawai", // Pastikan tabel tb_pegawai sudah ada
          key: "id_pegawai",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      gaji_pokok: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tunjangan: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      potongan: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      total_gaji: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tanggal_transfer: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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
    await queryInterface.dropTable("tb_gaji");
  },
};
