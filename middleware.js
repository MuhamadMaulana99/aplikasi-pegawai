import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token"); // Ambil token dari cookies
  const { pathname } = req.nextUrl; // Ambil path saat ini

  // Jika user sudah login dan mencoba akses "/login", arahkan ke dashboard
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Jika user belum login dan mencoba akses halaman selain "/login", redirect ke login
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // Lanjutkan request jika tidak perlu redirect
}

// Middleware hanya berjalan di halaman dashboard dan halaman selain login
export const config = {
  matcher: ["/dashboard/:path*", "/((?!api|_next|favicon.ico).*)"],
};
