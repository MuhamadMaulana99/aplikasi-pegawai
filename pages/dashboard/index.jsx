import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Layout from "../../components/Layout";
// import { logoutUser } from "../../utils/auth";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token"); // Cek token di cookies
    if (!token) {
      router.push("/login"); // Jika tidak ada token, redirect ke login
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Checking authentication...</p>;

  return <h1 className="text-3xl font-bold underline">Dashboard</h1>;
}
