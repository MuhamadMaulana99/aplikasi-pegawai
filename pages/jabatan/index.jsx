import React, { useState } from "react";
import DataTableJabatan from "../../components/table/DataTableJabatan";

const Jabatan = () => {
  const [data, setData] = useState([]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Data Jabatan</h2>
      <DataTableJabatan />
    </div>
  );
};

export default Jabatan;
