import { Op } from "sequelize";
import { Pegawai, Jabatan, Absensi, Gaji, Cuti } from "../../../models";
import { validatePegawai } from "../../../validators/pegawaiValidator";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const pegawai = await Pegawai.findAll({
          include: [
            { model: Jabatan, as: "jabatan" },
            {
              model: Absensi,
              as: "absensi",
              required: true,
              attributes: [
                "id_absensi",
                "tanggal",
                "jam_masuk",
                "jam_keluar",
                "status",
                "jumlah_adon",
              ],
            },
            {
              model: Gaji,
              as: "gaji",
              required: true,
              attributes: [
                "id_gaji",
                "total_gaji",
                "bonusAdon",
                "lembur",
                "potongan",
              ],
            },
            {
              model: Cuti,
              as: "cuti",
              required: false, 
              where: { status: "Disetujui" },
              separate: true,
              attributes: [
                "id_cuti",
                "tanggal_mulai",
                "tanggal_selesai",
                "jenis_cuti",
                "alasan",
                "status",
                "keterangan",
              ],
            }
          ],
        });
        const formatRupiah = (angka) =>
          new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(angka);

        // Mapping pegawai dengan total gaji, lembur, bonus, dan potongan
        const pegawaiWithTotals = pegawai.map((p) => {
          const totalAllGaji = p.gaji.reduce((sum, g) => sum + g.total_gaji, 0);
          const totalLembur = p.gaji.reduce((sum, g) => sum + g.lembur, 0);
          const totalBonusAdon = p.gaji.reduce(
            (sum, g) => sum + g.bonusAdon,
            0
          );
          const totalPotongan = p.gaji.reduce((sum, g) => sum + g.potongan, 0);

          return {
            ...p.toJSON(),
            totalAllGaji,
            totalAllGajiFormatted: formatRupiah(totalAllGaji),
            totalLembur,
            totalLemburFormatted: formatRupiah(totalLembur),
            totalBonusAdon,
            totalBonusAdonFormatted: formatRupiah(totalBonusAdon),
            totalPotongan,
            totalPotonganFormatted: formatRupiah(totalPotongan),
          };
        });
        return res.status(200).json(pegawaiWithTotals);
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Terjadi kesalahan pada server", error });
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
            return res
              .status(400)
              .json({ message: "Jabatan tidak ditemukan." });
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
        return res
          .status(500)
          .json({ message: "Terjadi kesalahan pada server", error });
      }

    default:
      return res.status(405).json({ message: "Metode tidak diizinkan" });
  }
}
