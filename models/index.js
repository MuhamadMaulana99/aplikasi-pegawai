"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const database = require("../lib/database");
// const sequelize = require("../config/database"); // Import koneksi DB

const User = require("./User")(database, DataTypes);
const Pegawai = require("./pegawai")(database, DataTypes); 
const Absensi = require("./absensi")(database, DataTypes); 
const Cuti = require("./cuti")(database, DataTypes); 
const Gaji = require("./gaji")(database, DataTypes); 
const Jabatan = require("./jabatan")(database, DataTypes); 

const db = {
  database,
  Sequelize,
  User,
  Pegawai,
  Absensi,
  Cuti,
  Gaji,
  Jabatan
};

// Jalankan asosiasi model
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
