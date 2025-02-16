import Joi from "joi";

const userSchema = Joi.object({
  id_pegawai: Joi.number().allow(null).messages({
    "number.base": "ID Pegawai harus berupa angka.",
  }),
  username: Joi.string().min(3).max(20).required().messages({
    "string.min": "Username minimal 3 karakter.",
    "string.max": "Username maksimal 20 karakter.",
    "any.required": "Username harus diisi.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password minimal 6 karakter.",
    "any.required": "Password harus diisi.",
  }),
  role: Joi.string().valid("admin", "user", "pegawai").required().messages({
    "any.only": "Role hanya boleh admin, user, atau pegawai.",
    "any.required": "Role harus diisi.",
  }),
});

export const validateUser = (data) => {
  return userSchema.validate(data, { abortEarly: false });
};
