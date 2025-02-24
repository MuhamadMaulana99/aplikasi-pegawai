import db, { Absensi, Jabatan } from "../models/index";
import moment from "moment";
import { Op } from "sequelize";

const { Gaji, Pegawai } = db;

export async function generateGaji(id_pegawai, absensiTerbaru) {
  try {
    // 🔹 Ambil data pegawai dan gaji pokok
    const pegawai = await Pegawai.findOne({
      where: { id_pegawai },
      include: {
        model: Jabatan,
        as: "jabatan",
        attributes: ["gaji_pokok"],
      },
    });

    if (!pegawai) {
      throw new Error("Pegawai tidak ditemukan");
    }

    const gaji_pokok = pegawai.jabatan.gaji_pokok;

    // 🔹 Ambil semua absensi pegawai dalam bulan ini
    const bulanIni = moment().format("YYYY-MM");
    const absensi = await Absensi.findAll({
      where: {
        id_pegawai,
        tanggal: {
          [Op.like]: `${bulanIni}%`, 
        },
      },
      attributes: ["status", "jam_masuk", "jam_keluar", "is_tanggal_merah"],
    });

    // 🔹 Hitung kehadiran, izin, dan keterlambatan
    // console.log(absensi, 'absensi')
    const izin = absensi.filter((record) => record.status === "Izin").length;
    const isTanggalMerah = absensi.some((record) => record.is_tanggal_merah);
    const jumlah_adon = absensi.length;

    // 🔹 Hitung hoursWorked
    let hoursWorked = 0;
    absensi.forEach((record) => {
      if (record.jam_masuk && record.jam_keluar) {
        const jamMasuk = moment(record.jam_masuk, "HH:mm");
        const jamKeluar = moment(record.jam_keluar, "HH:mm");
        hoursWorked += jamKeluar.diff(jamMasuk, "hours");
      }
    });

    // 🔹 Hitung keterlambatan (telat)
    let telat = 0;
    absensi.forEach((record) => {
      console.log(record.status, 'record.status')
      if (record.status === "Telat" && record.jam_masuk) {
        const jamMasuk = moment(record.jam_masuk, "HH:mm"); // Ambil dalam format lokal
        // console.log(jamMasuk, '---------------')
        const jam8 = moment("08:00", "HH:mm");
        const jam9 = moment("09:00", "HH:mm");
    
        if (jamMasuk.isAfter(jam9)) {
          telat += 2;
        } else if (jamMasuk.isAfter(jam8)) {
          telat += 1;
        }
      }
    });

    // 🔹 Hitung potongan
    const bpjs_kesehatan = gaji_pokok * 0.02;
    const bpjs_ketenagakerjaan = gaji_pokok * 0.005;
    const potongan_kehadiran = (gaji_pokok / 26) * izin;
    const potongan_telat = (gaji_pokok / 26 / 8) * telat;
    const total_potongan =
      bpjs_kesehatan +
      bpjs_ketenagakerjaan +
      potongan_kehadiran +
      potongan_telat;

    // 🔹 Hitung bonus
    const bonus = hitungBonus(jumlah_adon)

    // 🔹 Hitung lembur (overtime)
    const lembur_hours = 0; // Sesuaikan jika ada lembur_hours dari input
    let lembur = 0;
    if (isTanggalMerah && lembur_hours) {
      lembur = lembur_hours * 25000;
    }

    // 🔹 Hitung total gaji
    let total_gaji = 0;
    if (isTanggalMerah) {
      total_gaji = gaji_pokok / 26 + bonus + lembur - total_potongan;
    } else {
      total_gaji =
        (gaji_pokok / 26 / 8) * hoursWorked + bonus + lembur - total_potongan;
    }
    const tanggal_transfer = moment().format("YYYY-MM-DD");
    const existingGaji = await Gaji.findOne({
      where: {
        id_pegawai,
        tanggal_transfer: { [Op.like]: `${bulanIni}%` },
      },
    });

    if (existingGaji) {
      // 🔹 Jika gaji sudah ada, update gaji
      await existingGaji.update({
        gaji_pokok,
        tunjangan: 0,
        potongan: total_potongan,
        bonus,
        total_gaji,
        tanggal_transfer,
      });
    } else {
      // 🔹 Jika belum ada, buat gaji baru
      await Gaji.create({
        id_pegawai,
        tanggal_transfer,
        gaji_pokok,
        tunjangan: 0,
        potongan: total_potongan,
        bonus,
        total_gaji,
      });
    }

    console.log(`✅ Gaji untuk pegawai ${id_pegawai} berhasil diperbarui.`);
  } catch (error) {
    console.error("❌ Error saat menghitung gaji:", error);
  }
}
