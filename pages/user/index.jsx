import React, { useState } from "react";
import DataTableUser from "../../components/table/DataTableUser";

const Jabatan = () => {
  const [data, setData] = useState([]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Data User</h2>
      <DataTableUser />
    </div>
  );
};

export default Jabatan;
