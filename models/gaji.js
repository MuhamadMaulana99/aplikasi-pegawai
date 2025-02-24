"use strict";

module.exports = (sequelize, DataTypes) => {
  const Gaji = sequelize.define(
    "tb_gaji",
    {
      id_gaji: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_pegawai: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "tb_pegawai",
          key: "id_pegawai",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_absensi: { // 🔹 Tambahkan referensi ke Absensi
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "tb_absensi", // Referensi ke tabel absensi
          key: "id_absensi",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // 🔥 Jika absensi dihapus, gaji juga dihapus
      },
      tunjangan: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      potongan: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      total_gaji: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lembur: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      bonusAdon: { // Nama kolom yang baru
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      tanggal_transfer: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "tb_gaji",
      timestamps: true,
    }
  );

  Gaji.associate = (models) => {
    Gaji.belongsTo(models.Pegawai, {
      foreignKey: "id_pegawai",
      as: "pegawai", // Menambahkan alias untuk relasi ini
    });
  };
  return Gaji;
};
