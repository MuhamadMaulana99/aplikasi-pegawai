import React, { useState } from "react";
import DataTableGaji from "../../components/table/DataTableGaji";


const Gaji = () => {
  const [data, setData] = useState([]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Data Gaji</h2>
      <DataTableGaji data={data} setData={setData} />
    </div>
  );
};

export default Gaji;
