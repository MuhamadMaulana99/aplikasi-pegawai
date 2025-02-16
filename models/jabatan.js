"use strict";

module.exports = (sequelize, DataTypes) => {
  const Jabatan = sequelize.define(
    "Jabatan", // Nama model (Gunakan PascalCase)
    {
      id_jabatan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nama_jabatan: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      gaji_pokok: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "tb_jabatan", // Nama tabel di database
      timestamps: true,
    }
  );

  Jabatan.associate = (models) => {
    // Satu jabatan dapat dimiliki oleh banyak pegawai
    Jabatan.hasMany(models.Pegawai, {
      foreignKey: "id_jabatan",
      as: "pegawai",
      onDelete: "CASCADE", // Jika jabatan dihapus, set foreign key di Pegawai ke NULL
      onUpdate: "CASCADE",
    });
  };

  return Jabatan;
};
