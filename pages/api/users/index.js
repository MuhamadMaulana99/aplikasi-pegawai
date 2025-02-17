import db from "../../../models";
import { hashPassword } from "../../../utils/bcrypt";

const { User } = db;

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Mengambil semua data user kecuali password
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });
      return res.status(200).json({
        message: "Berhasil mengambil data user",
        data: users,
      });
    } catch (error) {
      console.error("❌ Error saat mengambil data user:", error);
      return res.status(500).json({
        status: "error",
        message: "Terjadi kesalahan saat mengambil data pengguna",
        error: error.message,
      });
    }
  }

  if (req.method === "POST") {
    const { username, password, role, id_pegawai } = req.body;

    // Validasi jika username, password, role, atau id_pegawai tidak ada
    if (!username || !password || !role || !id_pegawai) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }

    try {
      // Hash password
      const hashedPassword = await hashPassword(password);

      // Menambahkan user baru ke dalam database
      const newUser = await User.create({
        username,
        password: hashedPassword,
        role,
        id_pegawai,
      });

      return res.status(201).json({
        message: "User berhasil ditambahkan",
        user: {
          id: newUser.id_user,
          username: newUser.username,
          role: newUser.role,
          id_pegawai: newUser.id_pegawai,
        },
      });
    } catch (error) {
      console.error("❌ Error saat membuat user:", error);
      return res.status(500).json({
        status: "error",
        message: "Terjadi kesalahan saat membuat user",
        error: error.message,
      });
    }
  }

  // Jika metode yang digunakan bukan GET atau POST
  return res.status(405).json({ message: "Metode tidak diizinkan" });
}
