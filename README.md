Fitur
- login
- tambah user(owner, manager, admin, user)
	#onwer -> semua menu menentukan user role dan tambah pegawai
	#manager -> CRUD absensi,CRUD pegawai, CRUD jabatan, dia gak bisa melihat slip gaji yang lain(gak bisa liat nominal gaji)
	#admin -> CRUD absensi,CRUD pegawai, dia gak bisa melihat slip gaji yang lain(gak bisa liat nominal gaji)
	#user -> hanya lihat slip gaji berdasarkan nama
	note: admin tidak bisa lihat gajih jabatan
	note: manager gak bisa masukan nominal gajih jabatan
	note: 
- tambah pegawai
- tambah jabatan(manager, staffAdmin, baker(buatkue), leader baker, leader admin)
- absensi(admin menambahkan data absen staff admin dan baker)
	#cuti(user mengajukan cuti dan admin approve)
	#izin(user mengajukan izin dan admin approve)
	#sakit tidak perlu approve langsung di tambahkan sama admin
- gaji(potongan(bpjs, kehadiran, telat, bonus, lembur, tanggal merah) gaji berdasarkan jabatan
	1.potongan
	#bpjs(kesehatan= 2% dari gaji, ketenagakerjaan= 0.5%)
	#kehadiran(gaji gapok/26 * berapa kali izin)
	#telat(gaji gapok/26/8jam * berapa jam dia telat)
	#bonus(di dapat dari berapa user mengadon kue, jika 30 adon dapat 25k, belaku kelipatan)
	#lembur(jika tanggal merah= gapok/26 hari, lembur perjam 25k)
	#slip gaji(export pdf), baru bisa di download setelah acc owner
	2.gaji perjabatan
	#manager = 8.5jt
	#admin = 4jt
	#baker = 5.0jt
	#leader baker = 6.5jt
	#leader admin = 6jt

note: user === pegawai

#frontend
- reactjs, vuejs, php,
#backend
*database
- springboot dll