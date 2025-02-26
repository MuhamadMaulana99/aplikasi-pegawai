import React, { useState } from "react";
import DataTablePegawai from "../../components/table/DataTablePegawai";

const initialData = [
  {
    id_pegawai: 9,
    nip: "1212112",
    nama_lengkap: "Indra",
    tempat_lahir: "Cilenggang",
    tanggal_lahir: "1999-01-02T00:00:00.000Z",
    jenis_kelamin: "P",
    alamat: "Jl. Cilenggang",
    no_telp: "08978687978",
    email: "Indra@example.com",
    status_kepegawaian: "Tetap",
    id_jabatan: 5,
    tanggal_masuk: "2023-01-01T00:00:00.000Z",
  },
];

const Pegawai = () => {
  const [data, setData] = useState(initialData);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Data Pegawai</h2>
      <DataTablePegawai data={data} setData={setData} />
    </div>
  );
};

export default Pegawai;
