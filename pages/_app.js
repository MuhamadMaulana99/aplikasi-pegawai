"use client";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { useHydrated } from "../src/context/HydrationContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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

  // Halaman tanpa Layout (misalnya "/login" atau "/register")
  const noLayoutPages = ["/login", "/register"];
  const isNoLayoutPage = noLayoutPages.includes(router.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      {!isHydrated &&
        (isNoLayoutPage ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ))}
    </QueryClientProvider>
  );
}

export default MyApp;
