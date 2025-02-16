import Link from "next/link";
import { useRouter } from "next/router";
import { getToken, logoutUser } from "../utils/api";

export default function Navbar() {
  const router = useRouter();
  const token = getToken();

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link href="/">Home</Link> | 
      {token ? (
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Logout</button>
      ) : (
        <Link href="/login" style={{ marginLeft: "10px" }}>Login</Link>
      )}
    </nav>
  );
}
