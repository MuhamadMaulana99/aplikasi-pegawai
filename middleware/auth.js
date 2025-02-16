import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  
  if (!token) return res.status(401).json({ message: "Akses ditolak, token tidak ditemukan" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token tidak valid" });
    
    req.user = user;
    next();
  });
};
