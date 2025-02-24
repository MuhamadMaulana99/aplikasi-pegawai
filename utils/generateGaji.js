import db, { Absensi, Jabatan } from "../models/index";
import { Op } from "sequelize";
import {
  hitungBonus,
  hitungBonusAdon,
  hitungJamLembur,
  hitungLembur,
} from "./helper";
import moment from "moment";

const { Gaji, Pegawai } = db;

export async function generateGaji(id_pegawai, absensiTerbaru) {
  try {
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
    const { jam_masuk, jam_keluar, status, is_tanggal_merah, jumlah_adon } =
      absensiTerbaru;
    // 🔹 Hitung jam kerja dari absensi terbaru
    let hoursWorked = 0;
    if (jam_masuk && jam_keluar) {
      const jamMasuk = moment(jam_masuk, "HH:mm");
      const jamKeluar = moment(jam_keluar, "HH:mm");
      hoursWorked = jamKeluar.diff(jamMasuk, "hours");
    }

    // 🔹 Cek keterlambatan
    let telat = 0;
    if (status === "Telat" && jam_masuk) {
      const jamMasuk = moment(jam_masuk, "HH:mm");
      const jam8 = moment("08:00", "HH:mm");
      const jam9 = moment("09:00", "HH:mm");

      if (jamMasuk.isAfter(jam9)) {
        telat = 2;
      } else if (jamMasuk.isAfter(jam8)) {
        telat = 1;
      }
    }

    // 🔹 Hitung potongan
    const gajiPerhari = gaji_pokok / 26;
    const potongan_telat = (gajiPerhari / 8) * telat;
    // const potongan_kehadiran = status === "Izin" ? gaji_pokok / 26 : 0;
    const total_potongan = gajiPerhari - potongan_telat;

    // 🔹 Hitung bonus (langsung dari absensi terbaru)
    // const bonus = is_tanggal_merah ? 25000 : 0;
    const bonusAdon = hitungBonus(jumlah_adon);
    const jamLembur = hitungJamLembur(jam_masuk, jam_keluar);
    const lembur = hitungLembur(
      gaji_pokok,
      jamLembur?.jamLembur,
      is_tanggal_merah
    );
    console.log(gajiPerhari, "gajiPerhari");
    console.log(total_potongan, "total_potongan");
    // console.log(lembur, "lembur");
    // console.log(jamLembur, "jamLembur");

    // 🔹 Hitung total gaji
    let total_gaji = 0;
    if (is_tanggal_merah) {
      total_gaji = gajiPerhari + bonusAdon - potongan_telat;
    } else {
      total_gaji = gajiPerhari + bonusAdon - potongan_telat;
    }

    const tanggal_transfer = moment().format("YYYY-MM-DD");
    await Gaji.create({
      id_pegawai,
      tanggal_transfer,
      gaji_pokok,
      potongan: total_potongan,
      bonusAdon,
      total_gaji,
      lembur,
    });

    // if (existingGaji) {
    //   // 🔹 Update gaji jika sudah ada di bulan ini
    //   await existingGaji.update({
    //     total_gaji: existingGaji.total_gaji + total_gaji,
    //     potongan: existingGaji.potongan + total_potongan,
    //     bonus: bonus,
    //     lembur,
    //   });
    // } else {
    //   // 🔹 Buat gaji baru jika belum ada di bulan ini
    //   await Gaji.create({
    //     id_pegawai,
    //     tanggal_transfer,
    //     gaji_pokok,
    //     tunjangan: 0,
    //     potongan: total_potongan,
    //     bonus,
    //     total_gaji,
    //     lembur,
    //   });
    // }

    console.log(`✅ Gaji untuk pegawai ${id_pegawai} berhasil diperbarui.`);
  } catch (error) {
    console.error("❌ Error saat menghitung gaji:", error);
  }
}
