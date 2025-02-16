import Joi from "joi";

export const validateCuti = (data) => {
  const schema = Joi.object({
    id_pegawai: Joi.number().integer().strict().required().messages({
      "any.required": "ID Pegawai wajib diisi",
      "number.base": "ID Pegawai harus berupa angka",
    }),
    tanggal_mulai: Joi.date().iso().required().messages({
      "any.required": "Tanggal mulai wajib diisi",
      "date.base": "Format tanggal harus dalam bentuk YYYY-MM-DD",
    }),
    tanggal_selesai: Joi.date()
      .iso()
      .greater(Joi.ref("tanggal_mulai"))
      .required()
      .messages({
        "any.required": "Tanggal selesai wajib diisi",
        "date.base": "Format tanggal harus dalam bentuk YYYY-MM-DD",
        "date.greater": "Tanggal selesai harus setelah tanggal mulai",
      }),
    jenis_cuti: Joi.string()
      .valid("Tahunan", "Sakit", "Melahirkan", "Lainnya")
      .required()
      .messages({
        "any.required": "Jenis cuti wajib diisi",
        "string.base": "Jenis cuti harus berupa teks",
        "any.only": "Jenis cuti harus salah satu dari: Tahunan, Sakit, Melahirkan, atau Lainnya",
      }),
    alasan: Joi.string().min(5).required().messages({
      "any.required": "Alasan wajib diisi",
      "string.min": "Alasan harus minimal 5 karakter",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};
