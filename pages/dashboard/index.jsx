import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { logoutUser } from "../../utils/api";
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

  const handleLogout = () => {
    logoutUser();
    router.push("/login"); // Redirect ke login setelah logout
  };

  if (loading) return <p>Checking authentication...</p>;

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
