// pages/api/swagger.js
import { createSwaggerSpec } from "next-swagger-doc";

export default async function swaggerSpec(req, res) {
  const spec = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Baked Goods application",
        version: "1.0.0",
      },
      servers: [{ url: "http://localhost:3000/api" }],
      paths: {
        "/auth/login": {
          post: {
            summary: "Login User",
            description: "Endpoint untuk login dan mendapatkan token.",
            tags: ["Authentication"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      username: { type: "string" },
                      password: { type: "string" },
                    },
                    required: ["username", "password"],
                  },
                },
              },
            },
            responses: {
              200: {
                description: "Login berhasil.",
              },
              400: { description: "Validasi gagal atau kredensial salah." },
              500: { description: "Terjadi kesalahan pada server." },
            },
          },
        },
        "/auth/register": {
          post: {
            summary: "Register User",
            description: "Endpoint untuk mendaftarkan user baru.",
            tags: ["Authentication"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      username: { type: "string" },
                      password: { type: "string" },
                      role: { type: "string", enum: ["Admin", "Pegawai"] },
                      id_pegawai: { type: "integer" },
                    },
                    required: ["username", "password", "role"],
                  },
                },
              },
            },
            responses: {
              201: {
                description: "User berhasil didaftarkan",
              },
              400: { description: "Validasi gagal atau user sudah ada" },
              500: { description: "Terjadi kesalahan pada server" },
            },
          },
        },
        "/pegawai": {
          get: {
            summary: "Ambil data pegawai",
            description: "Endpoint untuk mengambil semua data pegawai.",
            tags: ["Pegawai"],
            responses: {
              200: {
                description: "Berhasil mengambil data pegawai",
              },
            },
          },
          post: {
            summary: "Tambah pegawai baru",
            description: "Endpoint untuk menambahkan data pegawai.",
            tags: ["Pegawai"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      nip: { type: "string" },
                      nama_lengkap: { type: "string" },
                      tempat_lahir: { type: "string" },
                      tanggal_lahir: { type: "string", format: "date" },
                      jenis_kelamin: { type: "string", enum: ["L", "P"] },
                      alamat: { type: "string" },
                      no_telp: { type: "string" },
                      email: { type: "string", format: "email" },
                      status_kepegawaian: {
                        type: "string",
                        enum: ["Tetap", "Kontrak"],
                      },
                      id_divisi: { type: "integer" },
                      id_jabatan: { type: "integer" },
                      tanggal_masuk: { type: "string", format: "date" },
                    },
                    required: [
                      "nip",
                      "nama_lengkap",
                      "tempat_lahir",
                      "tanggal_lahir",
                      "jenis_kelamin",
                      "alamat",
                      "no_telp",
                      "email",
                      "status_kepegawaian",
                      "id_divisi",
                      "id_jabatan",
                      "tanggal_masuk",
                    ],
                  },
                },
              },
            },
            responses: {
              201: { description: "Pegawai berhasil ditambahkan." },
              400: { description: "Validasi gagal." },
              500: { description: "Terjadi kesalahan pada server." },
            },
          },
        },

        "/jabatan": {
          post: {
            summary: "Tambah data jabatan",
            description: "Endpoint untuk menambahkan data jabatan baru.",
            tags: ["Jabatan"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      nama_jabatan: { type: "string" },
                      gaji_pokok: { type: "number" },
                    },
                    required: ["nama_jabatan", "gaji_pokok"],
                  },
                },
              },
            },
            responses: {
              201: {
                description: "Jabatan berhasil ditambahkan",
              },
            },
          },
        },
        "/divisi": {
          get: {
            summary: "Ambil data divisi",
            description: "Endpoint untuk mengambil data divisi.",
            tags: ["Divisi"],
            responses: {
              200: { description: "Data divisi berhasil diambil." },
            },
          },
          post: {
            summary: "Tambah divisi baru",
            description: "Endpoint untuk menambahkan data divisi.",
            tags: ["Divisi"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      nama_divisi: { type: "string" },
                    },
                    required: ["nama_divisi"],
                  },
                },
              },
            },
            responses: {
              201: { description: "Divisi berhasil ditambahkan." },
            },
          },
        },
        "/absensi": {
          get: {
            summary: "Ambil data absensi",
            description: "Endpoint untuk mengambil data absensi.",
            tags: ["Absensi"],
            responses: {
              200: { description: "Data absensi berhasil diambil." },
            },
          },
          post: {
            summary: "Catat absensi",
            description: "Endpoint untuk mencatat absensi pegawai.",
            tags: ["Absensi"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id_pegawai: { type: "integer" },
                      tanggal: { type: "string", format: "date" },
                      jam_masuk: { type: "string", example: "08:00" },
                      jam_keluar: { type: "string", example: "17:00" },
                      status: {
                        type: "string",
                        enum: ["Hadir", "Izin", "Sakit", "Alpha"],
                      },
                    },
                    required: ["id_pegawai", "tanggal", "jam_masuk", "status"],
                  },
                },
              },
            },
            responses: {
              201: { description: "Absensi berhasil dicatat." },
            },
          },
        },
        "/cuti": {
          get: {
            summary: "Ambil data cuti",
            description: "Endpoint untuk mengambil data pengajuan cuti.",
            tags: ["Cuti"],
            responses: {
              200: { description: "Data cuti berhasil diambil." },
            },
          },
          post: {
            summary: "Ajukan cuti",
            description: "Endpoint untuk mengajukan cuti.",
            tags: ["Cuti"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id_pegawai: { type: "integer" },
                      tanggal_mulai: { type: "string", format: "date" },
                      tanggal_selesai: { type: "string", format: "date" },
                      jenis_cuti: {
                        type: "string",
                        enum: ["Tahunan", "Sakit", "Melahirkan", "Lainnya"],
                      },
                      alasan: { type: "string" },
                    },
                    required: [
                      "id_pegawai",
                      "tanggal_mulai",
                      "tanggal_selesai",
                      "jenis_cuti",
                      "alasan",
                    ],
                  },
                },
              },
            },
            responses: {
              201: { description: "Pengajuan cuti berhasil." },
            },
          },
        },
        "/gaji": {
          get: {
            summary: "Ambil data gaji",
            description: "Endpoint untuk mengambil data gaji pegawai.",
            tags: ["Gaji"],
            responses: {
              200: { description: "Data gaji berhasil diambil." },
            },
          },
          post: {
            summary: "Catat gaji",
            description: "Endpoint untuk mencatat data gaji pegawai.",
            tags: ["Gaji"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id_pegawai: { type: "integer" },
                      gaji_pokok: { type: "number" },
                      tunjangan: { type: "number" },
                      potongan: { type: "number" },
                    },
                    required: ["id_pegawai", "gaji_pokok"],
                  },
                },
              },
            },
            responses: {
              201: { description: "Data gaji berhasil dicatat." },
            },
          },
        },
        "/user": {
          get: {
            summary: "Ambil data user",
            description: "Endpoint untuk mengambil data user.",
            tags: ["User"],
            responses: {
              200: { description: "Data user berhasil diambil." },
            },
          },
          post: {
            summary: "Tambah user",
            description: "Endpoint untuk menambahkan user baru.",
            tags: ["User"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      username: { type: "string" },
                      password: { type: "string" },
                      role: { type: "string", enum: ["Admin", "Pegawai"] },
                      id_pegawai: { type: "integer" },
                    },
                    required: ["username", "password", "role"],
                  },
                },
              },
            },
            responses: {
              201: { description: "User berhasil ditambahkan." },
            },
          },
        },
      },
    },
    definitions: {
      Pegawai: {
        type: "object",
        properties: {
          id_pegawai: { type: "integer" },
          nip: { type: "string" },
          nama_lengkap: { type: "string" },
          tempat_lahir: { type: "string" },
          tanggal_lahir: { type: "string", format: "date" },
          jenis_kelamin: { type: "string" },
          alamat: { type: "string" },
          no_telp: { type: "string" },
          email: { type: "string" },
          status_kepegawaian: { type: "string" },
          id_divisi: { type: "integer" },
          id_jabatan: { type: "integer" },
          tanggal_masuk: { type: "string", format: "date" },
        },
      },
    },
    security: [],
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
        description: "Masukkan token dengan format: Bearer <token>",
      },
    },
    tags: [
      { name: "Authentication", description: "Endpoint otentikasi" },
      { name: "Pegawai", description: "Endpoint terkait pegawai" },
      { name: "Jabatan", description: "Endpoint terkait jabatan" },
      { name: "Divisi", description: "Endpoint terkait divisi" },
      { name: "Absensi", description: "Endpoint terkait absensi" },
      { name: "Cuti", description: "Endpoint terkait cuti" },
      { name: "Gaji", description: "Endpoint terkait gaji" },
      { name: "User", description: "Endpoint terkait user" },
    ],
    apis: ["./pages/api/**/*.js"],
  });

  res.status(200).json(spec);
}
