import { Op, Sequelize } from "sequelize";
import { Pegawai, Jabatan, Absensi, Gaji, Cuti } from "../../../models";
import { validatePegawai } from "../../../validators/pegawaiValidator";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const pegawai = await Pegawai.findAll({
          attributes: ["id_pegawai", "nama_lengkap", "nip"],
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
                "status",
                "keterangan",
              ],
            },
          ],
          // group: ["Pegawai.id_pegawai"],
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
            total: {
              totalAllGaji,
              totalLembur,
              totalBonusAdon,
              totalPotongan,
            },
            totalFormatted: {
              totalAllGajiFormatted: formatRupiah(totalAllGaji),
              totalLemburFormatted: formatRupiah(totalLembur),
              totalBonusAdonFormatted: formatRupiah(totalBonusAdon),
              totalPotonganFormatted: formatRupiah(totalPotongan),
            },
          };
        });
        return res.status(200).json(pegawaiWithTotals);
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Terjadi kesalahan pada server", error });
      }
    default:
      return res.status(405).json({ message: "Metode tidak diizinkan" });
  }
}
