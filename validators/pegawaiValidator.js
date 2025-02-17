import Joi from "joi";

const pegawaiSchema = Joi.object({
  nip: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(6)
    .max(20)
    .required()
    .messages({
      "string.pattern.base": "NIP harus berupa angka.",
      "string.min": "NIP minimal 6 karakter.",
      "string.max": "NIP maksimal 20 karakter.",
      "any.required": "NIP wajib diisi.",
    }),
  nama_lengkap: Joi.string().min(3).max(100).required().messages({
    "string.min": "Nama lengkap minimal 3 karakter.",
    "string.max": "Nama lengkap maksimal 100 karakter.",
    "any.required": "Nama lengkap wajib diisi.",
  }),
  tempat_lahir: Joi.string().max(50).required().messages({
    "any.required": "Tempat lahir wajib diisi.",
  }),
  tanggal_lahir: Joi.date().iso().required().messages({
    "date.base": "Tanggal lahir harus berupa tanggal yang valid.",
    "any.required": "Tanggal lahir wajib diisi.",
  }),
  jenis_kelamin: Joi.string().valid("L", "P").required().messages({
    "any.only": "Jenis kelamin harus 'L' atau 'P'.",
    "any.required": "Jenis kelamin wajib diisi.",
  }),
  alamat: Joi.string().max(255).required().messages({
    "any.required": "Alamat wajib diisi.",
  }),
  no_telp: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .max(15)
    .required()
    .messages({
      "string.pattern.base": "Nomor telepon harus berupa angka.",
      "string.min": "Nomor telepon minimal 10 karakter.",
      "string.max": "Nomor telepon maksimal 15 karakter.",
      "any.required": "Nomor telepon wajib diisi.",
    }),
  email: Joi.string().email().required().messages({
    "string.email": "Format email tidak valid.",
    "any.required": "Email wajib diisi.",
  }),
  status_kepegawaian: Joi.string()
    .valid("Tetap", "Kontrak")
    .required()
    .messages({
      "any.only": "Status kepegawaian harus 'Tetap' atau 'Kontrak'.",
      "any.required": "Status kepegawaian wajib diisi.",
    }),
  id_jabatan: Joi.number().integer().required().messages({
    "number.base": "ID Jabatan harus berupa angka.",
    "any.required": "ID Jabatan wajib diisi.",
  }),
  tanggal_masuk: Joi.date().iso().required().messages({
    "date.base": "Tanggal masuk harus berupa tanggal yang valid.",
    "any.required": "Tanggal masuk wajib diisi.",
  }),
});

export const validatePegawai = (data) => {
  return pegawaiSchema.validate(data, { abortEarly: false });
};
