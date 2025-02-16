"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_pegawai: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "tb_pegawai",
          key: "id_pegawai",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("Admin", "Pegawai"),
        allowNull: false,
      },
    },
    {
      tableName: "tb_user",
      timestamps: true,
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.Pegawai, {
      foreignKey: "id_pegawai",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
      as: "pegawai",
    });
  };

  return User;
};
