import { comparePassword } from "../../../utils/bcrypt";
import { generateToken } from "../../../utils/jwt";

import db from "../../../models";

const { User } = db; // Pastikan model Pegawai sudah di-import

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: "User tidak ditemukan" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Password salah" });

    const token = generateToken(user);
    res.status(200).json({ message: "Login berhasil", user, token });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan", error });
  }
}
