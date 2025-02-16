import db from "../../../models";
import { errorResponse, successResponse } from "../../../utils/errorHandler";
// import { errorResponse, successResponse } from "../../../utils/errorHandler";

const { Cuti } = db;

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return errorResponse(res, "Metode tidak diizinkan", 405);
  }

  try {
    const { id, status } = req.body;

    // 🔹 Validasi status
    if (!["Disetujui", "Ditolak"].includes(status)) {
      return errorResponse(res, "Status harus 'Disetujui' atau 'Ditolak'", 400);
    }

    // 🔹 Cek apakah cuti ada
    const cuti = await Cuti.findOne({ where: { id } });
    if (!cuti) {
      return errorResponse(res, "Pengajuan cuti tidak ditemukan", 400);
    }

    // 🔹 Update status
    await cuti.update({ status });

    return successResponse(res, "Status cuti diperbarui", cuti, 200);
  } catch (error) {
    console.error("❌ Error saat memperbarui cuti:", error);
    return errorResponse(
      res,
      "Terjadi kesalahan pada server",
      500,
      error.message
    );
  }
}
