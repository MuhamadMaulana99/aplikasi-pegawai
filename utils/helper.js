import moment from "moment";

export function hitungLembur(gapok, jamLembur, tanggalMerah = false) {
  const gajiPerHari = gapok / 26; // Gaji pokok per hari
  const upahLemburPerJam = 25000; // Tarif lembur per jam

  let totalUpah = 0;

  if (tanggalMerah) {
    // Jika bekerja di tanggal merah, dapat gaji harian + lembur
    totalUpah = gajiPerHari + jamLembur * upahLemburPerJam;
  } else {
    // Jika bukan tanggal merah, hanya dibayar lembur
    totalUpah = jamLembur * upahLemburPerJam;
  }

  return totalUpah;
}

// Contoh penggunaan
// console.log(hitungLembur(5200000, 2, true));  // Output: Gaji harian + (2 jam x 25K)
// console.log(hitungLembur(5200000, 3, false)); // Output: Hanya (3 jam x 25K)
// console.log(hitungLembur(5200000, 0, true));  // Output: Gaji harian tanpa lembur
// console.log(hitungLembur(5200000, 0, false)); // Output: 0 (tidak lembur, bukan tanggal merah)

export function hitungJamLembur(jam_masuk, jam_keluar) {
  let hoursWorked = 0;
  let jamLembur = 0;

  if (jam_masuk && jam_keluar) {
    const jamMasuk = moment(jam_masuk, "HH:mm");
    const jamKeluar = moment(jam_keluar, "HH:mm");
    const batasLembur = moment("17:00", "HH:mm"); // Batas lembur jam 17:00

    hoursWorked = jamKeluar.diff(jamMasuk, "hours"); // Total jam kerja

    // Jika keluar lebih dari 17:00, hitung lembur
    if (jamKeluar.isAfter(batasLembur)) {
      jamLembur = jamKeluar.diff(batasLembur, "hours"); // Hitung jam lembur
    }
  }

  return { hoursWorked, jamLembur };
}
// console.log(hitungLembur("08:00", "18:00")); // { hoursWorked: 10, jamLembur: 1 }

export function hitungBonus(jumlah_adon) {
  if (jumlah_adon < 25) {
    console.log("❌ Bonus tidak diberikan karena adonan kurang dari 25.");
    return 0;
  }

  // Membulatkan ke bawah ke kelipatan 25 terdekat
  const adonan_dibulatkan = Math.floor(jumlah_adon / 25) * 25;
  const bonus = (adonan_dibulatkan / 25) * 25000;

  console.log(
    `🎉 Bonus diberikan: Rp ${bonus.toLocaleString()} (untuk ${adonan_dibulatkan} adonan)`
  );
  return bonus;
}
