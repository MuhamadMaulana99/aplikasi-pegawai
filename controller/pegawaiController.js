// const { Pegawai } = require('../models');

const pegawai = require("../models/pegawai");

// Menambahkan Pegawai Baru
exports.createPegawai = async (req, res) => {
  try {
    const pegawai = await pegawai.create(req.body);
    return res.status(201).json({
      success: true,
      message: 'Pegawai berhasil ditambahkan',
      data: pegawai,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menambahkan pegawai',
      error: error.message,
    });
  }
};

// Mendapatkan Semua Pegawai
exports.getAllPegawai = async (req, res) => {
  try {
    const pegawai = await Pegawai.findAll({ include: ['jabatan', 'divisi'] });
    return res.status(200).json({ success: true, data: pegawai });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data pegawai',
      error: error.message,
    });
  }
};

// Mengupdate Data Pegawai
exports.updatePegawai = async (req, res) => {
  try {
    const { id } = req.params;
    await Pegawai.update(req.body, { where: { id_pegawai: id } });
    return res.status(200).json({
      success: true,
      message: 'Pegawai berhasil diperbarui',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat memperbarui pegawai',
      error: error.message,
    });
  }
};

// Menghapus Data Pegawai
exports.deletePegawai = async (req, res) => {
  try {
    const { id } = req.params;
    await Pegawai.destroy({ where: { id_pegawai: id } });
    return res.status(200).json({
      success: true,
      message: 'Pegawai berhasil dihapus',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus pegawai',
      error: error.message,
    });
  }
};
