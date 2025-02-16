import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getToken } from "../utils/api";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = getToken();
    if (!savedToken) {
      router.push("/login");
    } else {
      setToken(savedToken);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Selamat Datang di Dashboard</h1>
      {token ? <p>Anda berhasil login!</p> : <p>Silakan login terlebih dahulu.</p>}
    </div>
  );
}
