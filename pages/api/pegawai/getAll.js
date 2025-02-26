import { Pegawai } from "../../../models";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const pegawai = await Pegawai.findAll();
        return res.status(200).json(pegawai);
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Terjadi kesalahan pada server", error });
      }

    default:
      return res.status(405).json({ message: "Metode tidak diizinkan" });
  }
}
