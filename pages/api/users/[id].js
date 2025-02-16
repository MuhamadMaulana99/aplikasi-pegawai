import db from "../../../models";
import { authenticateToken } from "../../../middleware/auth";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    return authenticateToken(req, res, async () => {
      const user = await db.User.findByPk(id, { attributes: { exclude: ["password"] } });
      if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
      res.status(200).json(user);
    });
  }

  if (req.method === "DELETE") {
    return authenticateToken(req, res, async () => {
      await db.User.destroy({ where: { id } });
      res.status(200).json({ message: "User dihapus" });
    });
  }
}
