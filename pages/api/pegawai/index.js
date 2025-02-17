import { Pegawai, Jabatan } from "../../../models";
import { validatePegawai } from "../../../validators/pegawaiValidator";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const pegawai = await Pegawai.findAll({
          include: [
            { model: Jabatan, as: "jabatan" }
          ]
        });
        return res.status(200).json(pegawai);
      } catch (error) {
        return res.status(500).json({ message: "Terjadi kesalahan pada server", error });
      }

    case "POST":
      try {
        // Validasi input menggunakan Joi melalui validator
        const { error, value } = validatePegawai(req.body);
        if (error) {
          return res.status(400).json({
            message: "Validasi gagal.",
            errors: error.details.map((err) => err.message),
          });
        }

        // Destructure nilai yang divalidasi
        const { nip, email, id_jabatan } = value;

        // Cek apakah NIP sudah digunakan
        const existingNIP = await Pegawai.findOne({ where: { nip } });
        if (existingNIP) {
          return res.status(400).json({ message: "NIP sudah terdaftar." });
        }

        // Cek apakah email sudah digunakan
        const existingEmail = await Pegawai.findOne({ where: { email } });
        if (existingEmail) {
          return res.status(400).json({ message: "Email sudah terdaftar." });
        }

        // Cek apakah jabatan ada (wajib diisi)
        if (id_jabatan) {
          const existingJabatan = await Jabatan.findByPk(id_jabatan);
          if (!existingJabatan) {
            return res.status(400).json({ message: "Jabatan tidak ditemukan." });
          }
        } else {
          return res.status(400).json({ message: "ID Jabatan wajib diisi." });
        }

        // Simpan pegawai baru dengan data yang sudah divalidasi
        const newPegawai = await Pegawai.create(value);

        return res.status(201).json({
          message: "Pegawai berhasil ditambahkan.",
          data: newPegawai,
        });
      } catch (error) {
        console.error("❌ Error saat menambahkan pegawai:", error);
        return res.status(500).json({ message: "Terjadi kesalahan pada server", error });
      }

    default:
      return res.status(405).json({ message: "Metode tidak diizinkan" });
  }
}
