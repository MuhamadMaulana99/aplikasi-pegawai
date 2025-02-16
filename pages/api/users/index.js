import db from "../../../models";
import { authenticateToken } from "../../../middleware/auth";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return authenticateToken(req, res, async () => {
      const users = await db.User.findAll({ attributes: { exclude: ["password"] } });
      res.status(200).json(users);
    });
  } 
  
  if (req.method === "POST") {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Semua field harus diisi" });

    const hashedPassword = await hashPassword(password);
    const newUser = await db.User.create({ username, password: hashedPassword });

    res.status(201).json({ message: "User ditambahkan", user: { id: newUser.id, username: newUser.username } });
  }
}
