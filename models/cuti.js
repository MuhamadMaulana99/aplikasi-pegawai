"use strict";

module.exports = (sequelize, DataTypes) => {
  const Cuti = sequelize.define(
    "tb_cuti",
    {
      id_cuti: {
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
      tanggal_mulai: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      tanggal_selesai: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      jenis_cuti: {
        type: DataTypes.ENUM("Tahunan", "Sakit", "Melahirkan", "Lainnya"),
        allowNull: false,
      },
      keterangan: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("Diajukan", "Disetujui", "Ditolak"),
        allowNull: false,
      },
    },
    {
      tableName: "tb_cuti",
      timestamps: true,
    }
  );

  Cuti.associate = (models) => {
    Cuti.hasMany(models.Pegawai, {
      foreignKey: "id_pegawai",
    });
  };

  return Cuti;
};
