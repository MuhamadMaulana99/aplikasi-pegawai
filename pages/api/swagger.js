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
              500: {
                description: "Terjadi kesalahan pada server",
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
                      nip: {
                        type: "string",
                      },
                      nama_lengkap: {
                        type: "string",
                      },
                      tempat_lahir: {
                        type: "string",
                      },
                      tanggal_lahir: {
                        type: "string",
                        format: "date",
                      },
                      jenis_kelamin: {
                        type: "string",
                        enum: ["L", "P"],
                      },
                      alamat: {
                        type: "string",
                      },
                      no_telp: {
                        type: "string",
                      },
                      email: {
                        type: "string",
                        format: "email",
                      },
                      status_kepegawaian: {
                        type: "string",
                        enum: ["Tetap", "Kontrak"],
                      },
                      id_jabatan: {
                        type: "integer",
                      },
                      tanggal_masuk: {
                        type: "string",
                        format: "date",
                      },
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
                      "id_jabatan",
                      "tanggal_masuk",
                    ],
                  },
                },
              },
            },
            responses: {
              201: {
                description: "Pegawai berhasil ditambahkan.",
              },
              400: {
                description: "Validasi gagal.",
              },
              500: {
                description: "Terjadi kesalahan pada server.",
              },
            },
          },
        },
        "/pegawai/{id}": {
          get: {
            summary: "Ambil data pegawai berdasarkan ID",
            description:
              "Endpoint untuk mengambil data pegawai berdasarkan ID.",
            tags: ["Pegawai"],
            parameters: [
              {
                name: "id",
                in: "path",
                description: "ID pegawai",
                required: true,
                schema: {
                  type: "integer",
                },
              },
            ],
            responses: {
              200: {
                description: "Berhasil mengambil data pegawai",
              },
              404: {
                description: "Pegawai tidak ditemukan",
              },
              500: {
                description: "Terjadi kesalahan pada server",
              },
            },
          },
          put: {
            summary: "Perbarui data pegawai",
            description:
              "Endpoint untuk memperbarui data pegawai berdasarkan ID.",
            tags: ["Pegawai"],
            parameters: [
              {
                name: "id",
                in: "path",
                description: "ID pegawai yang ingin diperbarui",
                required: true,
                schema: {
                  type: "integer",
                },
              },
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      nip: {
                        type: "string",
                      },
                      nama_lengkap: {
                        type: "string",
                      },
                      tempat_lahir: {
                        type: "string",
                      },
                      tanggal_lahir: {
                        type: "string",
                        format: "date",
                      },
                      jenis_kelamin: {
                        type: "string",
                        enum: ["L", "P"],
                      },
                      alamat: {
                        type: "string",
                      },
                      no_telp: {
                        type: "string",
                      },
                      email: {
                        type: "string",
                        format: "email",
                      },
                      status_kepegawaian: {
                        type: "string",
                        enum: ["Tetap", "Kontrak"],
                      },
                      id_jabatan: {
                        type: "integer",
                      },
                      tanggal_masuk: {
                        type: "string",
                        format: "date",
                      },
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
                      "id_jabatan",
                      "tanggal_masuk",
                    ],
                  },
                },
              },
            },
            responses: {
              200: {
                description: "Pegawai berhasil diperbarui",
              },
              400: {
                description: "Validasi gagal",
              },
              404: {
                description: "Pegawai tidak ditemukan",
              },
              500: {
                description: "Terjadi kesalahan pada server",
              },
            },
          },
          delete: {
            summary: "Hapus data pegawai",
            description:
              "Endpoint untuk menghapus data pegawai berdasarkan ID.",
            tags: ["Pegawai"],
            parameters: [
              {
                name: "id",
                in: "path",
                description: "ID pegawai yang ingin dihapus",
                required: true,
                schema: {
                  type: "integer",
                },
              },
            ],
            responses: {
              200: {
                description: "Pegawai berhasil dihapus",
              },
              404: {
                description: "Pegawai tidak ditemukan",
              },
              500: {
                description: "Terjadi kesalahan pada server",
              },
            },
          },
        },

        "/jabatan": {
          get: {
            summary: "Ambil semua data jabatan",
            description:
              "Endpoint untuk mengambil semua data jabatan yang ada.",
            tags: ["Jabatan"],
            responses: {
              200: {
                description: "Berhasil mengambil data jabatan",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id_jabatan: { type: "integer" },
                          nama_jabatan: { type: "string" },
                          gaji_pokok: { type: "number" },
                        },
                      },
                    },
                  },
                },
              },
              500: {
                description: "Terjadi kesalahan pada server",
              },
            },
          },
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
              400: {
                description: "Validasi gagal",
              },
              500: {
                description: "Terjadi kesalahan pada server",
              },
            },
          },
          put: {
            summary: "Ubah data jabatan",
            description: "Endpoint untuk mengubah data jabatan yang sudah ada.",
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
              200: {
                description: "Jabatan berhasil diperbarui",
              },
              400: {
                description: "Validasi gagal",
              },
              404: {
                description: "Jabatan tidak ditemukan",
              },
              500: {
                description: "Terjadi kesalahan pada server",
              },
            },
          },
          delete: {
            summary: "Hapus data jabatan",
            description:
              "Endpoint untuk menghapus data jabatan yang sudah ada.",
            tags: ["Jabatan"],
            parameters: [
              {
                name: "id_jabatan",
                in: "path",
                required: true,
                description: "ID jabatan yang akan dihapus",
                schema: {
                  type: "integer",
                },
              },
            ],
            responses: {
              200: {
                description: "Jabatan berhasil dihapus",
              },
              404: {
                description: "Jabatan tidak ditemukan",
              },
              500: {
                description: "Terjadi kesalahan pada server",
              },
            },
          },
        },

        "/absensi": {
          get: {
            summary: "Ambil semua data absensi",
            description: "Endpoint untuk mengambil semua data absensi.",
            tags: ["Absensi"],
            responses: {
              200: {
                description: "Berhasil mengambil data absensi",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id_absensi: { type: "integer" },
                          id_pegawai: { type: "integer" },
                          tanggal: { type: "string", format: "date-time" },
                          jam_masuk: { type: "string", format: "time" },
                          jam_keluar: { type: "string", format: "time" },
                          status: {
                            type: "string",
                            enum: ["Hadir", "Izin", "Sakit", "Alpha"],
                          },
                        },
                      },
                    },
                  },
                },
              },
              500: {
                description: "Terjadi kesalahan pada server",
              },
            },
          },
          post: {
            summary: "Tambah data absensi baru",
            description: "Endpoint untuk menambahkan data absensi.",
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
                      jam_masuk: { type: "string", format: "time" },
                      jam_keluar: { type: "string", format: "time" },
                      status: {
                        type: "string",
                        enum: ["Hadir", "Izin", "Sakit", "Alpha"],
                      },
                    },
                    required: ["id_pegawai", "tanggal", "status"],
                  },
                },
              },
            },
            responses: {
              201: {
                description: "Absensi berhasil ditambahkan",
              },
              400: {
                description: "Validasi gagal",
              },
              500: {
                description: "Terjadi kesalahan pada server",
              },
            },
          },
        },
        "/absensi/{id_absensi}": {
          get: {
            summary: "Ambil data absensi berdasarkan ID",
            description:
              "Endpoint untuk mengambil data absensi berdasarkan ID.",
            tags: ["Absensi"],
            parameters: [
              {
                name: "id_absensi",
                in: "path",
                required: true,
                description: "ID absensi yang ingin diambil",
                schema: {
                  type: "integer",
                },
              },
            ],
            responses: {
              200: {
                description: "Berhasil mengambil data absensi",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        id_absensi: { type: "integer" },
                        id_pegawai: { type: "integer" },
                        tanggal: { type: "string", format: "date-time" },
                        jam_masuk: { type: "string", format: "time" },
                        jam_keluar: { type: "string", format: "time" },
                        status: {
                          type: "string",
                          enum: ["Hadir", "Izin", "Sakit", "Alpha"],
                        },
                      },
                    },
                  },
                },
              },
              404: {
                description: "Absensi tidak ditemukan",
              },
              500: {
                description: "Terjadi kesalahan pada server",
              },
            },
          },
          put: {
            summary: "Edit data absensi",
            description:
              "Endpoint untuk memperbarui data absensi berdasarkan ID.",
            tags: ["Absensi"],
            parameters: [
              {
                name: "id_absensi",
                in: "path",
                required: true,
                description: "ID absensi yang ingin diperbarui",
                schema: {
                  type: "integer",
                },
              },
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id_pegawai: { type: "integer" },
                      tanggal: { type: "string", format: "date" },
                      jam_masuk: { type: "string", format: "time" },
                      jam_keluar: { type: "string", format: "time" },
                      status: {
                        type: "string",
                        enum: ["Hadir", "Izin", "Sakit", "Alpha"],
                      },
                    },
                    required: ["status"],
                  },
                },
              },
            },
            responses: {
              200: {
                description: "Absensi berhasil diperbarui",
              },
              400: {
                description: "Validasi gagal",
              },
              404: {
                description: "Absensi tidak ditemukan",
              },
              500: {
                description: "Terjadi kesalahan pada server",
              },
            },
          },
          delete: {
            summary: "Hapus data absensi",
            description:
              "Endpoint untuk menghapus data absensi berdasarkan ID.",
            tags: ["Absensi"],
            parameters: [
              {
                name: "id_absensi",
                in: "path",
                required: true,
                description: "ID absensi yang ingin dihapus",
                schema: {
                  type: "integer",
                },
              },
            ],
            responses: {
              200: {
                description: "Absensi berhasil dihapus",
              },
              404: {
                description: "Absensi tidak ditemukan",
              },
              500: {
                description: "Terjadi kesalahan pada server",
              },
            },
          },
          put: {
            summary: "Edit data absensi",
            description:
              "Endpoint untuk memperbarui data absensi berdasarkan ID.",
            tags: ["Absensi"],
            parameters: [
              {
                name: "id_absensi",
                in: "path",
                required: true,
                description: "ID absensi yang ingin diperbarui",
                schema: {
                  type: "integer",
                },
              },
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id_pegawai: { type: "integer" },
                      tanggal: { type: "string", format: "date" },
                      jam_masuk: { type: "string", format: "time" },
                      jam_keluar: { type: "string", format: "time" },
                      status: {
                        type: "string",
                        enum: ["Hadir", "Izin", "Sakit", "Alpha"],
                      },
                    },
                    required: ["status"],
                  },
                },
              },
            },
            responses: {
              200: {
                description: "Absensi berhasil diperbarui",
              },
              400: {
                description: "Validasi gagal",
              },
              404: {
                description: "Absensi tidak ditemukan",
              },
              500: {
                description: "Terjadi kesalahan pada server",
              },
            },
          },
        },
        "/cuti": {
          get: {
            summary: "Ambil data cuti",
            description: "Endpoint untuk mengambil data pengajuan cuti.",
            tags: ["Cuti"],
            responses: {
              200: {
                description: "Data cuti berhasil diambil.",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
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
                          status: {
                            type: "string",
                            enum: ["Disetujui", "Ditolak", "Menunggu"],
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "/cuti": {
            get: {
              summary: "Ambil daftar cuti pegawai",
              description:
                "Endpoint untuk mengambil daftar cuti pegawai yang disertai dengan nama lengkap pegawai, diurutkan berdasarkan tanggal mulai.",
              tags: ["Cuti"],
              responses: {
                200: {
                  description: "Daftar cuti berhasil diambil",
                  content: {
                    "application/json": {
                      schema: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "integer", example: 1 },
                            tanggal_mulai: {
                              type: "string",
                              format: "date",
                              example: "2025-02-17",
                            },
                            tanggal_selesai: {
                              type: "string",
                              format: "date",
                              example: "2025-02-19",
                            },
                            jenis_cuti: { type: "string", example: "Tahunan" },
                            status: { type: "string", example: "Disetujui" },
                            pegawai: {
                              type: "object",
                              properties: {
                                nama_lengkap: {
                                  type: "string",
                                  example: "John Doe",
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                500: {
                  description: "Terjadi kesalahan pada server",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          status: { type: "string", example: "error" },
                          message: {
                            type: "string",
                            example: "Terjadi kesalahan pada server",
                          },
                          error: {
                            type: "string",
                            example: "Database connection failed",
                          },
                        },
                      },
                    },
                  },
                },
              },
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
              201: {
                description: "Pengajuan cuti berhasil.",
              },
              400: {
                description: "Validasi gagal.",
              },
              500: {
                description: "Terjadi kesalahan pada server.",
              },
            },
          },
          delete: {
            summary: "Hapus pengajuan cuti",
            description:
              "Endpoint untuk menghapus pengajuan cuti berdasarkan ID.",
            tags: ["Cuti"],
            parameters: [
              {
                name: "id_cuti",
                in: "path",
                required: true,
                description: "ID pengajuan cuti yang ingin dihapus",
                schema: {
                  type: "integer",
                },
              },
            ],
            responses: {
              200: {
                description: "Pengajuan cuti berhasil dihapus",
              },
              404: {
                description: "Pengajuan cuti tidak ditemukan",
              },
              500: {
                description: "Terjadi kesalahan pada server",
              },
            },
          },
          put: {
            summary: "Edit pengajuan cuti",
            description:
              "Endpoint untuk memperbarui data pengajuan cuti berdasarkan ID.",
            tags: ["Cuti"],
            parameters: [
              {
                name: "id_cuti",
                in: "path",
                required: true,
                description: "ID pengajuan cuti yang ingin diperbarui",
                schema: {
                  type: "integer",
                },
              },
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      tanggal_mulai: { type: "string", format: "date" },
                      tanggal_selesai: { type: "string", format: "date" },
                      jenis_cuti: {
                        type: "string",
                        enum: ["Tahunan", "Sakit", "Melahirkan", "Lainnya"],
                      },
                      alasan: { type: "string" },
                      status: {
                        type: "string",
                        enum: ["Disetujui", "Ditolak", "Menunggu"],
                      },
                    },
                    required: ["status"],
                  },
                },
              },
            },
            responses: {
              200: {
                description: "Pengajuan cuti berhasil diperbarui",
              },
              400: {
                description: "Validasi gagal",
              },
              404: {
                description: "Pengajuan cuti tidak ditemukan",
              },
              500: {
                description: "Terjadi kesalahan pada server",
              },
            },
          },
        },
        "/cuti/status": {
          put: {
            summary: "Perbarui status cuti",
            description:
              "Endpoint untuk memperbarui status pengajuan cuti pegawai.",
            tags: ["Cuti"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: { type: "integer", example: 1 },
                      status: {
                        type: "string",
                        enum: ["Disetujui", "Ditolak"],
                        example: "Disetujui",
                      },
                    },
                    required: ["id", "status"],
                  },
                },
              },
            },
            responses: {
              200: {
                description: "Status cuti berhasil diperbarui.",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status: { type: "string", example: "success" },
                        message: {
                          type: "string",
                          example: "Status cuti diperbarui",
                        },
                        data: {
                          type: "object",
                          properties: {
                            id: { type: "integer", example: 1 },
                            status: { type: "string", example: "Disetujui" },
                          },
                        },
                      },
                    },
                  },
                },
              },
              400: {
                description: "Kesalahan validasi atau cuti tidak ditemukan.",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status: { type: "string", example: "error" },
                        message: {
                          type: "string",
                          example: "Pengajuan cuti tidak ditemukan",
                        },
                      },
                    },
                  },
                },
              },
              405: {
                description: "Metode tidak diizinkan.",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status: { type: "string", example: "error" },
                        message: {
                          type: "string",
                          example: "Metode tidak diizinkan",
                        },
                      },
                    },
                  },
                },
              },
              500: {
                description: "Terjadi kesalahan pada server.",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status: { type: "string", example: "error" },
                        message: {
                          type: "string",
                          example: "Terjadi kesalahan pada server",
                        },
                        error: {
                          type: "string",
                          example: "Database connection failed",
                        },
                      },
                    },
                  },
                },
              },
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
        "/gaji/{id}": {
          put: {
            summary: "Edit data gaji",
            description:
              "Endpoint untuk mengedit data gaji pegawai berdasarkan ID.",
            tags: ["Gaji"],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "integer" },
              },
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      gaji_pokok: { type: "number" },
                      tunjangan: { type: "number" },
                      potongan: { type: "number" },
                    },
                  },
                },
              },
            },
            responses: {
              200: { description: "Data gaji berhasil diperbarui." },
              404: { description: "Data gaji tidak ditemukan." },
            },
          },
          delete: {
            summary: "Hapus data gaji",
            description:
              "Endpoint untuk menghapus data gaji pegawai berdasarkan ID.",
            tags: ["Gaji"],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "integer" },
              },
            ],
            responses: {
              200: { description: "Data gaji berhasil dihapus." },
              404: { description: "Data gaji tidak ditemukan." },
            },
          },
        },
        "/users": {
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
        "/users/{id}": {
          get: {
            summary: "Ambil data user berdasarkan ID",
            description: "Endpoint untuk mengambil data user berdasarkan ID.",
            tags: ["User"],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "integer" },
              },
            ],
            responses: {
              200: { description: "Data user berhasil diambil." },
              404: { description: "User tidak ditemukan." },
            },
          },
          put: {
            summary: "Edit data user",
            description: "Endpoint untuk mengedit data user berdasarkan ID.",
            tags: ["User"],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "integer" },
              },
            ],
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
                  },
                },
              },
            },
            responses: {
              200: { description: "Data user berhasil diperbarui." },
              404: { description: "User tidak ditemukan." },
            },
          },
          delete: {
            summary: "Hapus data user",
            description: "Endpoint untuk menghapus data user berdasarkan ID.",
            tags: ["User"],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "integer" },
              },
            ],
            responses: {
              200: { description: "User berhasil dihapus." },
              404: { description: "User tidak ditemukan." },
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
      { name: "Absensi", description: "Endpoint terkait absensi" },
      { name: "Cuti", description: "Endpoint terkait cuti" },
      { name: "Gaji", description: "Endpoint terkait gaji" },
      { name: "User", description: "Endpoint terkait user" },
    ],
    apis: ["./pages/api/**/*.js"],
  });

  res.status(200).json(spec);
}
