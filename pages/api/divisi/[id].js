import sequelize from "../../../lib/sequelize";
import Divisi from "../../../models/divisi";

export default async function handler(req, res) {
  await sequelize.sync();
  const { id } = req.query;

  switch (req.method) {
    case 'GET': {
      try {
        const divisi = await Divisi.findByPk(id);
        if (!divisi) {
          return res.status(404).json({ success: false, message: 'Divisi tidak ditemukan' });
        }
        return res.status(200).json({ success: true, data: divisi });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    case 'PUT': {
      try {
        await Divisi.update(req.body, { where: { id_divisi: id } });
        return res.status(200).json({ success: true, message: 'Divisi berhasil diperbarui' });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    case 'DELETE': {
      try {
        await Divisi.destroy({ where: { id_divisi: id } });
        return res.status(200).json({ success: true, message: 'Divisi berhasil dihapus' });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    default:
      return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
