"use client"; // Tambahkan ini
import "../styles/globals.css";

import { useRouter } from "next/navigation";
import Layout from "../components/Layout";

export default function NotFound() {
  const router = useRouter();

  return (
    <Layout>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>404 - Halaman Tidak Ditemukan</h1>
        <p>Oops! Halaman yang kamu cari tidak tersedia.</p>
        <button onClick={() => router.push("/dashboard")}>
          Kembali ke Beranda
        </button>
      </div>
    </Layout>
  );
}
