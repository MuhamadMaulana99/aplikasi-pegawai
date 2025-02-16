import { Divisi } from "../../../models";
import { validateDivisi } from "../../../validators/divisiValidator";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const divisi = await Divisi.findAll();
        return res.status(200).json(divisi);
      } catch (error) {
        return res.status(500).json({ message: "Terjadi kesalahan pada server", error });
      }

    case "POST":
      try {
        const { error, value } = validateDivisi(req.body);

        if (error) {
          return res.status(400).json({
            message: "Validasi gagal.",
            errors: error.details.map((err) => err.message),
          });
        }

        // Cek apakah divisi dengan nama yang sama sudah ada
        const existingDivisi = await Divisi.findOne({ where: { nama_divisi: value.nama_divisi } });
        if (existingDivisi) {
          return res.status(400).json({ message: "Divisi dengan nama ini sudah ada." });
        }

        const newDivisi = await Divisi.create(value);
        return res.status(201).json({ message: "Divisi berhasil ditambahkan.", data: newDivisi });
      } catch (error) {
        return res.status(500).json({ message: "Terjadi kesalahan pada server", error });
      }

    default:
      return res.status(405).json({ message: "Metode tidak diizinkan" });
  }
}
