// import User from "../../models/userModel";
import bcrypt from "bcryptjs";
import User from "../../models/User";
import { errorResponse, successResponse } from "../../utils/errorHandler";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        return getUsers(req, res);
      case "POST":
        return addUser(req, res);
      case "PUT":
        return updateUser(req, res);
      case "DELETE":
        return deleteUser(req, res);
      default:
        return errorResponse(res, new Error("Method Not Allowed"), 405);
    }
  } catch (error) {
    return errorResponse(res, error);
  }
}

// ✅ GET: Ambil semua user
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return successResponse(res, "Berhasil mengambil data user", users);
  } catch (error) {
    return errorResponse(res, error);
  }
};

// ✅ POST: Tambah user baru
const addUser = async (req, res) => {
  try {
    const { id_pegawai, username, password, role } = req.body;
    if (!username || !password || !role) {
      return errorResponse(res, new Error("Data tidak lengkap"), 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ id_pegawai, username, password: hashedPassword, role });

    return successResponse(res, "User berhasil ditambahkan", newUser, 201);
  } catch (error) {
    return errorResponse(res, error);
  }
};

// ✅ PUT: Update user
const updateUser = async (req, res) => {
  try {
    const { id_user, username, password, role } = req.body;
    const user = await User.findByPk(id_user);
    if (!user) return errorResponse(res, new Error("User tidak ditemukan"), 404);

    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;
    await user.update({ username, password: hashedPassword, role });

    return successResponse(res, "User berhasil diperbarui", user);
  } catch (error) {
    return errorResponse(res, error);
  }
};

// ✅ DELETE: Hapus user
const deleteUser = async (req, res) => {
  try {
    const { id_user } = req.body;
    const user = await User.findByPk(id_user);
    if (!user) return errorResponse(res, new Error("User tidak ditemukan"), 404);

    await user.destroy();
    return successResponse(res, "User berhasil dihapus");
  } catch (error) {
    return errorResponse(res, error);
  }
};
