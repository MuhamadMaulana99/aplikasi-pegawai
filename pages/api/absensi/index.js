import { errorResponse, successResponse } from "../../../utils/errorHandler";
// import db from "../../../models";
import { validateAbsensi } from "../../../validators/absensiValidator";
import db from "../../../models";

const { Absensi, Pegawai } = db;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return errorResponse(res, "Metode tidak diizinkan", 405);
  }

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

    const { id_pegawai, tanggal, jam_masuk, jam_keluar, status } = value;

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
