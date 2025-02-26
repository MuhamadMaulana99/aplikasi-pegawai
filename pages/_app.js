"use client"; 
import "../styles/globals.css";
import Layout from "../components/Layout";
import { useHydrated } from "../src/context/HydrationContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isHydrated = useHydrated();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url === "/404") {
        router.push("/dashboard"); // Redirect ke halaman utama jika 404
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <>
      {!isHydrated && (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}

export default MyApp;
