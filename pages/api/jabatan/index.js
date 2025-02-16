// // pages/api/jabatan.js
import { errorResponse, successResponse } from "../../../utils/errorHandler";
import db from "../../../models";
import { validateJabatan } from "../../../validators/validateJabatan";

const { Jabatan } = db;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Validasi input menggunakan Joi
      const { error, value } = validateJabatan(req.body);
      if (error) {
        return errorResponse(
          res,
          "Validasi gagal",
          400,
          error.details.map((err) => err.message)
        );
      }

      // Cek apakah jabatan dengan nama yang sama sudah ada
      const existingJabatan = await Jabatan.findOne({ where: { nama_jabatan: value.nama_jabatan } });
      if (existingJabatan) {
        return errorResponse(res, "Jabatan dengan nama ini sudah ada", 400);
      }

      // Simpan jabatan baru ke database
      const newJabatan = await Jabatan.create(value);
      return successResponse(res, "Jabatan berhasil ditambahkan", newJabatan, 201);
    } catch (error) {
      console.error("❌ Error saat menambahkan jabatan:", error);
      return errorResponse(res, "Terjadi kesalahan pada server", 500, error.message);
    }
  } else if (req.method === "GET") {
    try {
      // Ambil semua data jabatan
      const jabatanList = await Jabatan.findAll();
      return successResponse(res, "Data jabatan berhasil diambil", jabatanList, 200);
    } catch (error) {
      console.error("❌ Error saat mengambil data jabatan:", error);
      return errorResponse(res, "Terjadi kesalahan pada server", 500, error.message);
    }
  } else {
    return errorResponse(res, "Metode tidak diizinkan", 405);
  }
}
