import bcrypt from "bcryptjs"; // Pakai bcryptjs untuk Next.js
import { errorResponse, successResponse } from "../../../utils/errorHandler";
import db from "../../../models";

const { User, Pegawai } = db; // Pastikan model Pegawai sudah di-import

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return errorResponse(res, "Metode tidak diizinkan", 405);
  }

  try {
    const { id_pegawai, username, password, role } = req.body;

    // 🔹 Validasi input
    if (!username || !password || !role) {
      return errorResponse(res, "Semua field wajib diisi", 400);
    }
    if (password.length < 6) {
      return errorResponse(res, "Password minimal 6 karakter", 400);
    }

    // 🔹 Cek apakah username sudah digunakan
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return errorResponse(res, "Username sudah digunakan", 400);
    }

    // 🔹 Validasi apakah id_pegawai ada di tabel tb_pegawai
    console.log(id_pegawai, 'id_pegawai')
    if (id_pegawai) {
      const existingPegawai = await Pegawai.findOne({
        where: { id_pegawai },
        attributes: ["id_pegawai", "nama_lengkap", "id_divisi"], // Ubah dari `nama_pegawai` ke `nama_lengkap`
      });
      if (!existingPegawai) {
        return errorResponse(
          res,
          "Pegawai dengan ID tersebut tidak ditemukan",
          400
        );
      }
    }

    // 🔹 Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Simpan user baru ke database
    const newUser = await User.create({
      id_pegawai: id_pegawai || null, // Jika tidak ada, bisa diset null
      username,
      password: hashedPassword,
      role,
    });

    return successResponse(res, "User berhasil didaftarkan", newUser, 201);
  } catch (error) {
    console.error("❌ Error saat register user:", error);

    // 🔹 Jika error dari Sequelize (misalnya constraint gagal)
    if (error.name === "SequelizeValidationError") {
      return errorResponse(res, "Validasi gagal", 400, error.errors);
    }

    return errorResponse(
      res,
      "Terjadi kesalahan pada server",
      500,
      error.message
    );
  }
}
