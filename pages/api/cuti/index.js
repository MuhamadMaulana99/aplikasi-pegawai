import { validateCuti } from "../../../validators/cutiValidator";
import { errorResponse, successResponse } from "../../../utils/errorHandler";
import { Cuti, Pegawai } from "../../../models";

// const { Cuti, Pegawai } = db;

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        // 🔹 Ambil semua data cuti dengan informasi pegawai terkait
        const cutiList = await Cuti.findAll({
          include: [
            {
              model: Pegawai,
              as: "pegawai",
              attributes: ["id_pegawai", "nama_lengkap"], // Ambil hanya beberapa kolom
            },
          ],
          order: [["tanggal_mulai", "DESC"]],
        });

        return successResponse(res, "Data cuti berhasil diambil", cutiList);
      } catch (error) {
        console.error("❌ Error saat mengambil data cuti:", error);
        return errorResponse(res, "Terjadi kesalahan pada server", 500, error.message);
      }

    case "POST":
      try {
        const { error, value } = validateCuti(req.body);
        if (error) {
          return errorResponse(res, "Validasi gagal", 400, error.details.map((err) => err.message));
        }

        const { id_pegawai, tanggal_mulai, tanggal_selesai, keterangan, jenis_cuti, status } = value;

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
          keterangan,
          jenis_cuti,
          status: status || "Diajukan",
        });

        return successResponse(res, "Pengajuan cuti berhasil", cuti, 201);
      } catch (error) {
        console.error("❌ Error saat mengajukan cuti:", error);
        return errorResponse(res, "Terjadi kesalahan pada server", 500, error.message);
      }

    default:
      return errorResponse(res, "Metode tidak diizinkan", 405);
  }
}
