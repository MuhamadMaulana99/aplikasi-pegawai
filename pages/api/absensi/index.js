import { errorResponse, successResponse } from "../../../utils/errorHandler";
import { validateAbsensi } from "../../../validators/absensiValidator";
import db from "../../../models";

const { Absensi, Pegawai } = db;

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getAbsensi(req, res);
    case "POST":
      return postAbsensi(req, res);
    default:
      return errorResponse(res, "Metode tidak diizinkan", 405);
  }
}

// 🔹 GET: Ambil data absensi (semua atau berdasarkan ID pegawai)
async function getAbsensi(req, res) {
  try {
    const { id_pegawai } = req.query;

    let absensi;
    if (id_pegawai) {
      absensi = await Absensi.findAll({
        where: { id_pegawai },
        include: [
          {
            model: Pegawai,
            as: "pegawai",
            attributes: ["id_pegawai", "nama_lengkap"],
          },
        ],
        order: [["tanggal", "DESC"]],
      });

      if (absensi.length === 0) {
        return errorResponse(
          res,
          "Tidak ada data absensi untuk pegawai ini",
          404
        );
      }
    } else {
      absensi = await Absensi.findAll({
        include: [
          {
            model: Pegawai,
            as: "pegawai",
            attributes: ["id_pegawai", "nama_lengkap"],
          },
        ],
        order: [["tanggal", "DESC"]],
      });

      if (absensi.length === 0) {
        return errorResponse(res, "Tidak ada data absensi tersedia", 404);
      }
    }

    return successResponse(res, "Data absensi berhasil diambil", absensi);
  } catch (error) {
    console.error("❌ Error saat mengambil data absensi:", error);
    return errorResponse(
      res,
      "Terjadi kesalahan pada server",
      500,
      error.message
    );
  }
}

// 🔹 POST: Tambah data absensi
async function postAbsensi(req, res) {
  try {
    // 🔹 Validasi input dengan Joi
    const { error, value } = validateAbsensi(req.body);
    if (error) {
      return errorResponse(
        res,
        "Validasi gagal",
        400,
        error.details.map((err) => err.message)
      );
    }

    const {
      id_pegawai,
      tanggal,
      jam_masuk,
      jam_keluar,
      status,
      is_tanggal_merah,
      jumlah_adon,
    } = value;

    // 🔹 Cek apakah Pegawai ada di database
    const pegawai = await Pegawai.findOne({
      where: { id_pegawai },
      attributes: ["id_pegawai", "nama_lengkap"],
    });

    if (!pegawai) {
      return errorResponse(
        res,
        "Pegawai dengan ID tersebut tidak ditemukan",
        400
      );
    }

    // 🔹 Cek apakah sudah ada absensi di tanggal yang sama
    const existingAbsensi = await Absensi.findOne({
      where: { id_pegawai, tanggal },
    });
    if (existingAbsensi) {
      return errorResponse(
        res,
        "Pegawai sudah melakukan absensi hari ini",
        400
      );
    }

    // 🔹 Simpan data absensi
    const newAbsensi = await Absensi.create({
      id_pegawai,
      tanggal,
      jam_masuk,
      jam_keluar: jam_keluar || null,
      status,
      is_tanggal_merah,
      jumlah_adon,
    });

    return successResponse(res, "Absensi berhasil dicatat", newAbsensi, 201);
  } catch (error) {
    console.error("❌ Error saat mencatat absensi:", error);
    return errorResponse(
      res,
      "Terjadi kesalahan pada server",
      500,
      error.message
    );
  }
}
