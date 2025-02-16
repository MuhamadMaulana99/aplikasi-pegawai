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
      gaji_pokok: {
        type: DataTypes.FLOAT,
        allowNull: false,
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
    Gaji.hasMany(models.Pegawai, {
      foreignKey: "id_pegawai",
    });
  };

  return Gaji;
};
