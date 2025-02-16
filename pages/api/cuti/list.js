import db from "../../../models";
import { successResponse, errorResponse } from "../../../utils/errorHandler";

const { Cuti, Pegawai } = db;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return errorResponse(res, "Metode tidak diizinkan", 405);
  }

  try {
    const daftarCuti = await Cuti.findAll({
      include: {
        model: Pegawai,
        attributes: ["nama_lengkap"],
      },
      order: [["tanggal_mulai", "DESC"]],
    });

    return successResponse(res, "Daftar cuti", daftarCuti, 200);
  } catch (error) {
    console.error("❌ Error saat mengambil daftar cuti:", error);
    return errorResponse(
      res,
      "Terjadi kesalahan pada server",
      500,
      error.message
    );
  }
}
