import db, { Absensi, Jabatan } from "../../../models";
import { validateGaji } from "../../../validators/gajiValidator";
import { errorResponse, successResponse } from "../../../utils/errorHandler";

const { Gaji, Pegawai } = db;

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const { id_pegawai } = req.query;

        if (id_pegawai) {
          // 🔹 Ambil data gaji berdasarkan id_pegawai
          const gaji = await Gaji.findAll({
            include: [
              {
                model: Pegawai,
                as: "pegawai", // Menggunakan alias sesuai relasi
                attributes: ["id_pegawai", "nama_lengkap"],
              },
            ],
          });

          if (!gaji || gaji.length === 0) {
            return errorResponse(res, "Gaji tidak ditemukan", 404);
          }

          return successResponse(res, "Data gaji berhasil diambil", gaji);
        } else {
          // 🔹 Ambil semua data gaji
          const gaji = await Gaji.findAll({
            include: [
              {
                model: Pegawai,
                as: "pegawai",
                attributes: ["id_pegawai", "nama_lengkap"],
              },
            ],
          });

          if (!gaji || gaji.length === 0) {
            return errorResponse(res, "Gaji tidak ditemukan", 404);
          }

          return successResponse(res, "Data gaji berhasil diambil", gaji);
        }
      } catch (error) {
        console.error("❌ Error saat mengambil data gaji:", error);
        return errorResponse(
          res,
          "Terjadi kesalahan pada server",
          500,
          error.message
        );
      }
    case "POST":
      try {
        const { error, value } = validateGaji(req.body);
        if (error) {
          return errorResponse(
            res,
            "Validasi gagal",
            400,
            error.details.map((err) => err.message)
          );
        }

        const {
          id_pegawai,
          tunjangan = 0,
          lembur_hours,
        } = value;

        // 🔹 Cek apakah pegawai ada
        const pegawai = await Pegawai.findOne({
          where: { id_pegawai },
          include: {
            model: Jabatan,
            as: "jabatan", 
            attributes: ["gaji_pokok"],
          },
        });
        if (!pegawai) {
          return errorResponse(res, "Pegawai tidak ditemukan", 400);
        }
        const gaji_pokok = pegawai.jabatan.gaji_pokok;

        const absensi = await Absensi.findAll({
          where: { id_pegawai },
          attributes: ["status", "jam_masuk", "jam_keluar", "is_tanggal_merah"],
        });

        const izin = absensi.filter(
          (record) => record.status === "Izin"
        ).length;
        const isTanggalMerah = absensi.some(
          (record) => record.is_tanggal_merah
        );
        const jumlah_adon = absensi.some((record) => record.jumlah_adon);

        const jamMasuk = absensi.jam_masuk
          ? moment(absensi.jam_masuk, "HH:mm")
          : null;
        const jamKeluar = absensi.jam_keluar
          ? moment(absensi.jam_keluar, "HH:mm")
          : null;

        // 🔹 Hitung hoursWorked (jam kerja efektif)
        let hoursWorked = 0;
        if (jamMasuk && jamKeluar) {
          hoursWorked = jamKeluar.diff(jamMasuk, "hours");
        }

        // console.log(hoursWorked, 'hoursWorked')

        // 🔹 Hitung telat (late) per jam
        let telat = 0;
        absensi.forEach((record) => {
          if (record.status === "Telat" && record.jam_masuk) {
            const jamMasuk = new Date(`1970-01-01T${record.jam_masuk}:00Z`); // Create date object from jam_masuk
            const jam8 = new Date("1970-01-01T08:00:00Z"); // 8 AM
            const jam9 = new Date("1970-01-01T09:00:00Z"); // 9 AM

            if (jamMasuk > jam9) {
              telat += 2; // Late by 2 hours if jam_masuk > 9 AM
            } else if (jamMasuk > jam8) {
              telat += 1; // Late by 1 hour if jam_masuk > 8 AM
            }
          }
        });

        // 🔹 Hitung potongan BPJS
        const bpjs_kesehatan = gaji_pokok * 0.02; // 2% for BPJS Kesehatan
        const bpjs_ketenagakerjaan = gaji_pokok * 0.005; // 0.5% for BPJS Ketenagakerjaan

        // 🔹 Hitung potongan kehadiran (izin)
        const potongan_kehadiran = (gaji_pokok / 26) * izin;

        // 🔹 Hitung potongan telat
        const potongan_telat = (gaji_pokok / 26 / 8) * telat;

        // 🔹 Hitung bonus
        const total_potongan =
          bpjs_kesehatan +
          bpjs_ketenagakerjaan +
          potongan_kehadiran +
          potongan_telat;

        // 🔹 Hitung bonus
        const bonus = Math.floor(jumlah_adon / 30) * 25000;

        // 🔹 Hitung lembur (overtime) jika ada
        let lembur = 0;
        if (isTanggalMerah && lembur_hours) {
          lembur = lembur_hours * 25000; // Assuming overtime is paid at 25,000 per hour
        }

        // 🔹 Check if tanggal_merah (public holiday) and calculate pay
        let total_gaji = 0;
        if (isTanggalMerah) {
          total_gaji =
            gaji_pokok / 26 + tunjangan + bonus + lembur - total_potongan;
        } else {
          total_gaji =
            (gaji_pokok / 26 / 8) * hoursWorked +
            tunjangan +
            bonus +
            lembur -
            total_potongan;
        }
        if (isNaN(total_gaji)) {
          console.error("❌ Terjadi kesalahan: total_gaji NaN", {
            gaji_pokok,
            tunjangan,
            bonus,
            lembur,
            total_potongan,
            hoursWorked,
          });
          return errorResponse(
            res,
            "Terjadi kesalahan dalam perhitungan gaji",
            500
          );
        }
        // 🔹 Hitung total gaji

        // 🔹 Simpan data gaji
        const gaji = await Gaji.create({
          id_pegawai,
          gaji_pokok,
          tunjangan,
          potongan: total_potongan,
          total_gaji,
          tanggal_transfer: new Date(),
        });

        return successResponse(res, "Data gaji berhasil disimpan", gaji, 201);
      } catch (error) {
        console.error("❌ Error saat menyimpan gaji:", error);
        return errorResponse(
          res,
          "Terjadi kesalahan pada server",
          500,
          error.message
        );
      }

    default:
      return errorResponse(res, "Metode tidak diizinkan", 405);
  }
}
