import Joi from "joi";

const divisiSchema = Joi.object({
  nama_divisi: Joi.string().min(3).max(50).required().messages({
    "string.min": "Nama divisi minimal 3 karakter.",
    "string.max": "Nama divisi maksimal 50 karakter.",
    "any.required": "Nama divisi harus diisi.",
  }),
});

export const validateDivisi = (data) => {
  return divisiSchema.validate(data, { abortEarly: false });
};
