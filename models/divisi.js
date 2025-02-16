"use strict";

module.exports = (sequelize, DataTypes) => {
  const Divisi = sequelize.define(
    "Divisi",
    {
      id_divisi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nama_divisi: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "tb_divisi",
      timestamps: false,
    }
  );

  Divisi.associate = (models) => {
    Divisi.hasMany(models.Pegawai, {
      foreignKey: "id_divisi",
      as: "pegawai",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Divisi;
};
