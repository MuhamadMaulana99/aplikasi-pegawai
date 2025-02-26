import '../styles/globals.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getToken } from "../utils/api";
import Layout from "../components/Layout";

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
    <Layout>
      <h1 className="text-2xl font-bold">Home Page</h1>
    </Layout>
  );
}
