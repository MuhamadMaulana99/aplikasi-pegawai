import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home"); // Redirect ke halaman yang Anda inginkan
    }, 3000); // Redirect setelah 3 detik

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-2">Halaman tidak ditemukan!</p>
      <p className="text-sm mt-2">Mengalihkan ke halaman utama...</p>
    </div>
  );
}
