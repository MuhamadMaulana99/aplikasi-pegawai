"use strict";

module.exports = (sequelize, DataTypes) => {
  const Pegawai = sequelize.define(
    "Pegawai",
    {
      id_pegawai: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_jabatan: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Jabatan",
          key: "id_jabatan",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      nip: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      nama_lengkap: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      tempat_lahir: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      tanggal_lahir: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      jenis_kelamin: {
        type: DataTypes.ENUM("L", "P"),
        allowNull: false,
      },
      alamat: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      no_telp: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      status_kepegawaian: {
        type: DataTypes.ENUM("Tetap", "Kontrak"),
        allowNull: false,
      },
      tanggal_masuk: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "tb_pegawai",
      timestamps: false,
    }
  );

  Pegawai.associate = (models) => {
    Pegawai.belongsTo(models.Jabatan, {
      foreignKey: "id_jabatan",
      as: "jabatan",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    Pegawai.hasMany(models.Absensi, {
      foreignKey: "id_pegawai",
      as: "absensi",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Pegawai.hasMany(models.Gaji, {
      foreignKey: "id_pegawai",
      as: "gaji",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Pegawai.hasMany(models.Cuti, {
      foreignKey: "id_cuti",
      as: "cuti",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Pegawai;
};
