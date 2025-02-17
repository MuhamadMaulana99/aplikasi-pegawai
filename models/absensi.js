"use strict";

module.exports = (sequelize, DataTypes) => {
  const Absensi = sequelize.define(
    "Absensi",
    {
      id_absensi: {
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
      tanggal: {
        type: DataTypes.DATEONLY, // Hanya menyimpan tanggal tanpa waktu
        allowNull: false,
      },
      jam_masuk: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      jam_keluar: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("Hadir", "Izin", "Sakit", "Alpha"),
        allowNull: false,
      },
    },
    {
      tableName: "tb_absensi",
      timestamps: true,
    }
  );

  Absensi.associate = (models) => {
    // 🔹 Setiap data absensi dimiliki oleh satu pegawai
    Absensi.belongsTo(models.Pegawai, {
      foreignKey: "id_pegawai",
      as: "pegawai",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Absensi;
};
