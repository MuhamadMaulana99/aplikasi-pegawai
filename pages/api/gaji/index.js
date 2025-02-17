import db from "../../../models";
import { validateGaji } from "../../../validators/gajiValidator";
import { errorResponse, successResponse } from "../../../utils/errorHandler";

const { Gaji, Pegawai } = db;

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const { id_pegawai } = req.query;

        if (id_pegawai) {
          // 🔹 Ambil data gaji berdasarkan id_pegawai
          const gaji = await Gaji.findAll({
            include: [
              {
                model: Pegawai,
                as: "pegawai", // Menggunakan alias sesuai relasi
                attributes: ["id_pegawai", "nama_lengkap"],
              },
            ],
          });

          if (!gaji || gaji.length === 0) {
            return errorResponse(res, "Gaji tidak ditemukan", 404);
          }

          return successResponse(res, "Data gaji berhasil diambil", gaji);
        } else {
          // 🔹 Ambil semua data gaji
          const gaji = await Gaji.findAll({
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
        }
      } catch (error) {
        console.error("❌ Error saat mengambil data gaji:", error);
        return errorResponse(
          res,
          "Terjadi kesalahan pada server",
          500,
          error.message
        );
      }
    case "POST":
      try {
        const { error, value } = validateGaji(req.body);
        if (error) {
          return errorResponse(
            res,
            "Validasi gagal",
            400,
            error.details.map((err) => err.message)
          );
        }

        const { id_pegawai, gaji_pokok, tunjangan = 0, potongan = 0 } = value;

        // 🔹 Cek apakah pegawai ada
        const pegawai = await Pegawai.findOne({ where: { id_pegawai } });
        if (!pegawai) {
          return errorResponse(res, "Pegawai tidak ditemukan", 400);
        }

        // 🔹 Hitung total gaji
        const total_gaji = gaji_pokok + tunjangan - potongan;

        // 🔹 Simpan data gaji
        const gaji = await Gaji.create({
          id_pegawai,
          gaji_pokok,
          tunjangan,
          potongan,
          total_gaji,
          tanggal_transfer: new Date(),
        });

        return successResponse(res, "Data gaji berhasil disimpan", gaji, 201);
      } catch (error) {
        console.error("❌ Error saat menyimpan gaji:", error);
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
