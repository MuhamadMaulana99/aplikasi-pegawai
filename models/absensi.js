"use strict";

module.exports = (sequelize, DataTypes) => {
  const Absensi = sequelize.define(
    "tb_absensi",
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
        type: DataTypes.DATE,
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
    Absensi.belongsTo(models.Pegawai, { foreignKey: "id_pegawai" });
  };

  return Absensi;
};
