// import Pegawai from '@/models/pegawai';
// import sequelize from '@/lib/db';

import sequelize from "../../../lib/sequelize";
import Pegawai from "../../../models/pegawai";

export default async function handler(req, res) {
  await sequelize.sync();
  const { id } = req.query;

  switch (req.method) {
    case 'GET': {
      try {
        const pegawai = await Pegawai.findByPk(id);
        if (!pegawai) {
          return res.status(404).json({ success: false, message: 'Pegawai tidak ditemukan' });
        }
        return res.status(200).json({ success: true, data: pegawai });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    case 'PUT': {
      try {
        await Pegawai.update(req.body, { where: { id_pegawai: id } });
        return res.status(200).json({ success: true, message: 'Pegawai berhasil diperbarui' });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    case 'DELETE': {
      try {
        await Pegawai.destroy({ where: { id_pegawai: id } });
        return res.status(200).json({ success: true, message: 'Pegawai berhasil dihapus' });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    default:
      return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
