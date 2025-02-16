import db from "../../../models";
import { validateGaji } from "../../../validators/gajiValidator";
import { errorResponse, successResponse } from "../../../utils/errorHandler";

const { Gaji, Pegawai } = db;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return errorResponse(res, "Metode tidak diizinkan", 405);
  }

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
}
