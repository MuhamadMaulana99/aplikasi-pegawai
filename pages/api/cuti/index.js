import db from "../../../models";
import { validateCuti } from "../../../validators/cutiValidator";
// import { validateCuti } from "../../../validators/cutiValidator";
import { errorResponse, successResponse } from "../../../utils/errorHandler";

const { Cuti, Pegawai } = db;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return errorResponse(res, "Metode tidak diizinkan", 405);
  }

  try {
    const { error, value } = validateCuti(req.body);
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
      tanggal_mulai,
      tanggal_selesai,
      alasan,
      jenis_cuti,
      status,
    } = value;

    // 🔹 Cek apakah pegawai ada
    const pegawai = await Pegawai.findOne({ where: { id_pegawai } });
    if (!pegawai) {
      return errorResponse(res, "Pegawai tidak ditemukan", 400);
    }

    // 🔹 Simpan pengajuan cuti
    const cuti = await Cuti.create({
      id_pegawai,
      tanggal_mulai,
      tanggal_selesai,
      alasan,
      jenis_cuti,
      status: status || "Pending",
    });

    return successResponse(res, "Pengajuan cuti berhasil", cuti, 201);
  } catch (error) {
    console.error("❌ Error saat mengajukan cuti:", error);
    return errorResponse(
      res,
      "Terjadi kesalahan pada server",
      500,
      error.message
    );
  }
}
