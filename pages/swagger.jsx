// pages/swagger.js
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function SwaggerPage() {
  const { data, error } = useSWR("/api/swagger", fetcher);

  if (error) return <div>Gagal memuat dokumentasi API.</div>;
  if (!data) return <div>Loading...</div>;

  return <SwaggerUI spec={data} />;
}
