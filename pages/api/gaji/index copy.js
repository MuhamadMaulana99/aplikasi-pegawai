import db, { Absensi, Jabatan } from "../../../models";
import { validateGaji } from "../../../validators/gajiValidator";
import { errorResponse, successResponse } from "../../../utils/errorHandler";

const { Gaji, Pegawai } = db;

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const { id_pegawai } = req.query;

        let whereCondition = {};
        if (id_pegawai) {
          whereCondition = { id_pegawai };
        }

        const gaji = await Gaji.findAll({
          where: whereCondition,
          include: [
            {
              model: Pegawai,
              as: "pegawai",
              attributes: ["id_pegawai", "nama_lengkap"],
            },
          ],
        });

        if (!gaji || gaji.length === 0) {
          return errorResponse(res, "Gaji tidak ditemukan", 404);
        }

        return successResponse(res, "Data gaji berhasil diambil", gaji);
      } catch (error) {
        console.error("❌ Error saat mengambil data gaji:", error);
        return errorResponse(
          res,
          "Terjadi kesalahan pada server",
          500,
          error.message
        );
      }

    default:
      return errorResponse(res, "Metode tidak diizinkan", 405);
  }
}
