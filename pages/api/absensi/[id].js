import db from "../../../models";

const { Absensi } = db;

export default async function handler(req, res) {
  const { id } = req.query; // ID absensi dari URL parameter

  switch (req.method) {
    case "GET": {
      try {
        const absensi = await Absensi.findByPk(id);
        if (!absensi) {
          return res
            .status(404)
            .json({ success: false, message: "Absensi tidak ditemukan" });
        }
        return res.status(200).json({ success: true, data: absensi });
      } catch (error) {
        return res
          .status(500)
          .json({
            success: false,
            message: "Terjadi kesalahan",
            error: error.message,
          });
      }
    }

    case "PUT": {
      try {
        const [updated] = await Absensi.update(req.body, {
          where: { id_absensi: id },
        });

        if (updated === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Absensi tidak ditemukan" });
        }

        return res
          .status(200)
          .json({ success: true, message: "Absensi berhasil diperbarui" });
      } catch (error) {
        return res
          .status(500)
          .json({
            success: false,
            message: "Terjadi kesalahan",
            error: error.message,
          });
      }
    }

    case "DELETE": {
      try {
        const deleted = await Absensi.destroy({ where: { id_absensi: id } });

        if (deleted === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Absensi tidak ditemukan" });
        }

        return res
          .status(200)
          .json({ success: true, message: "Absensi berhasil dihapus" });
      } catch (error) {
        return res
          .status(500)
          .json({
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
