import Joi from "joi";

// 🔹 Schema validasi untuk absensi
export const validateAbsensi = (data) => {
  const schema = Joi.object({
    id_pegawai: Joi.number().integer().required().messages({
      "number.base": "ID Pegawai harus berupa angka",
      "number.integer": "ID Pegawai harus bilangan bulat",
      "any.required": "ID Pegawai wajib diisi",
    }),
    tanggal: Joi.date().iso().required().messages({
      "date.base": "Format tanggal tidak valid",
      "date.iso": "Format tanggal harus ISO 8601 (YYYY-MM-DD)",
      "any.required": "Tanggal wajib diisi",
    }),
    jam_masuk: Joi.string()
      .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .required()
      .messages({
        "string.pattern.base": "Jam masuk harus dalam format HH:mm",
        "any.required": "Jam masuk wajib diisi",
      }),
    jam_keluar: Joi.string()
      .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .allow(null, "")
      .messages({
        "string.pattern.base": "Jam keluar harus dalam format HH:mm",
      }),
    status: Joi.string()
      .valid("Hadir", "Izin", "Sakit", "Alpha", "Telat")
      .required()
      .messages({
        "any.only": "Status harus salah satu dari: Hadir, Izin, Sakit, Alpha, Telat",
        "any.required": "Status wajib diisi",
      }),
    is_tanggal_merah: Joi.boolean().required().messages({
      "any.required": "is_tanggal_merah wajib diisi",
    }),
    jumlah_adon: Joi.number().integer().min(0).required().messages({
      "number.base": "Jumlah Adon harus berupa angka",
      "number.integer": "Jumlah Adon harus bilangan bulat",
      "number.min": "Jumlah Adon tidak boleh negatif",
      "any.required": "Jumlah Adon wajib diisi",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};
