"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tb_pegawai", {
      id_pegawai: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_jabatan: {
        type: Sequelize.INTEGER,
        allowNull: true, // Biarkan null jika pegawai tidak memiliki jabatan atau jika jabatan dihapus
        references: {
          model: "tb_jabatan", // Nama tabel yang direferensikan (pastikan case-sensitive sesuai)
          key: "id_jabatan",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      nip: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      nama_lengkap: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      tempat_lahir: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      tanggal_lahir: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      jenis_kelamin: {
        type: Sequelize.ENUM("L", "P"),
        allowNull: false,
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      no_telp: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      status_kepegawaian: {
        type: Sequelize.ENUM("Tetap", "Kontrak"),
        allowNull: false,
      },
      id_divisi: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tanggal_masuk: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("tb_pegawai");
  },
};
