import { Cuti, Pegawai } from "../../../models";
import { errorResponse, successResponse } from "../../../utils/errorHandler";

export default async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case "PUT":
      try {
        const { id_pegawai, tanggal_mulai, tanggal_selesai, keterangan, jenis_cuti, status } = req.body;

        const updated = await Cuti.update(
          { id_pegawai, tanggal_mulai, tanggal_selesai, keterangan, jenis_cuti, status },
          { where: { id_cuti: id } }
        );

        if (updated[0] === 0) {
          return errorResponse(res, "Cuti tidak ditemukan atau tidak ada perubahan", 404);
        }

        return successResponse(res, "Data cuti berhasil diperbarui");
      } catch (error) {
        console.error("❌ Error saat memperbarui data cuti:", error);
        return errorResponse(res, "Terjadi kesalahan pada server", 500, error.message);
      }

    case "DELETE":
      try {
        const deleted = await Cuti.destroy({ where: { id_cuti: id } });

        if (!deleted) {
          return errorResponse(res, "Cuti tidak ditemukan", 404);
        }

        return successResponse(res, "Data cuti berhasil dihapus");
      } catch (error) {
        console.error("❌ Error saat menghapus data cuti:", error);
        return errorResponse(res, "Terjadi kesalahan pada server", 500, error.message);
      }

    default:
      return errorResponse(res, "Metode tidak diizinkan", 405);
  }
}
