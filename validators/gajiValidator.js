import Joi from "joi";

export const validateGaji = (data) => {
  const schema = Joi.object({
    id_pegawai: Joi.number().integer().required().messages({
      "any.required": "ID Pegawai wajib diisi",
      "number.base": "ID Pegawai harus berupa angka",
    }),
    gaji_pokok: Joi.number().positive().required().messages({
      "any.required": "Gaji pokok wajib diisi",
      "number.base": "Gaji pokok harus berupa angka",
      "number.positive": "Gaji pokok harus lebih dari 0",
    }),
    tunjangan: Joi.number().min(0).optional().messages({
      "number.base": "Tunjangan harus berupa angka",
      "number.min": "Tunjangan tidak boleh negatif",
    }),
    potongan: Joi.number().min(0).optional().messages({
      "number.base": "Potongan harus berupa angka",
      "number.min": "Potongan tidak boleh negatif",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};
