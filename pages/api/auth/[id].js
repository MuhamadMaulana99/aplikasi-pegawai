import db from "../../../models";

const { User } = db;

export default async function handler(req, res) {
  const { id } = req.query; // ID User dari URL parameter

  switch (req.method) {
    case "PUT": {
      try {
        const [updated] = await User.update(req.body, {
          where: { id_user: id },
        });

        if (updated === 0) {
          return res
            .status(404)
            .json({ success: false, message: "User tidak ditemukan" });
        }

        return res
          .status(200)
          .json({ success: true, message: "User berhasil diperbarui" });
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
        const deleted = await User.destroy({ where: { id_user: id } });

        if (deleted === 0) {
          return res
            .status(404)
            .json({ success: false, message: "User tidak ditemukan" });
        }

        return res
          .status(200)
          .json({ success: true, message: "User berhasil dihapus" });
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
