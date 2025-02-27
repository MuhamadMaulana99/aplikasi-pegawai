import React, { useState } from "react";
import DataTableAbsensi from "../../components/table/DataTableAbsensi";

const Absensi = () => {
  const [data, setData] = useState([]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Data Absensi</h2>
      <DataTableAbsensi data={data} setData={setData} />
    </div>
  );
};

export default Absensi;
