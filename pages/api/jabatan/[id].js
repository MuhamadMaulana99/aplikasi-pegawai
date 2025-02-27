import db from "../../../models";

const { Jabatan } = db;

export default async function handler(req, res) {
  const { id } = req.query; // ID Jabatan dari URL parameter

  switch (req.method) {
    case "PUT": {
      try {
        const [updated] = await Jabatan.update(req.body, {
          where: { id_jabatan: id },
        });

        if (updated === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Jabatan tidak ditemukan" });
        }

        return res
          .status(200)
          .json({ success: true, message: "Jabatan berhasil diperbarui" });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Terjadi kesalahan",
          error: error.message,
        });
      }
    }

    case "DELETE": {
      try {
        const deleted = await Jabatan.destroy({ where: { id_jabatan: id } });

        if (deleted === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Jabatan tidak ditemukan" });
        }

        return res
          .status(200)
          .json({ success: true, message: "Jabatan berhasil dihapus" });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Terjadi kesalahan",
          error: error.message,
        });
      }
    }

    default:
      return res
        .status(405)
        .json({ success: false, message: "Metode tidak diizinkan" });
  }
}
