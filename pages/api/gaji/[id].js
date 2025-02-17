import db from "../../../models";

const { Gaji } = db;

export default async function handler(req, res) {
  const { id } = req.query; // ID gaji dari URL parameter

  switch (req.method) {


    case "PUT": {
      try {
        const [updated] = await Gaji.update(req.body, {
          where: { id_gaji: id },
        });

        if (updated === 0) {
          return res
            .status(404)
            .json({ success: false, message: "gaji tidak ditemukan" });
        }

        return res
          .status(200)
          .json({ success: true, message: "gaji berhasil diperbarui" });
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
        const deleted = await Gaji.destroy({ where: { id_gaji: id } });

        if (deleted === 0) {
          return res
            .status(404)
            .json({ success: false, message: "gaji tidak ditemukan" });
        }

        return res
          .status(200)
          .json({ success: true, message: "gaji berhasil dihapus" });
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
