// validators/jabatanValidator.js
import Joi from "joi";

export const validateJabatan = (data) => {
  const schema = Joi.object({
    nama_jabatan: Joi.string().min(3).max(100).required().messages({
      "string.empty": "Nama jabatan wajib diisi",
      "string.min": "Nama jabatan minimal 3 karakter",
      "string.max": "Nama jabatan maksimal 100 karakter",
      "any.required": "Nama jabatan wajib diisi",
    }),
    gaji_pokok: Joi.number().integer().positive().required().messages({
      "number.base": "Gaji pokok harus berupa angka",
      "number.positive": "Gaji pokok harus lebih dari 0",
      "any.required": "Gaji pokok wajib diisi",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};
