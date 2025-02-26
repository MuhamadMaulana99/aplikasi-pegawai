import Link from "next/link";
import { useRouter } from "next/router";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { getToken, logoutUser } from "../utils/api";
import { useEffect, useState } from "react";

export default function Navbar({ isOpen }) {
  const router = useRouter();
  const token = getToken();
  const [navbarWidth, setNavbarWidth] = useState("w-[calc(100%-4rem)]");

  useEffect(() => {
    setNavbarWidth(isOpen ? "w-[calc(100%-15rem)]" : "w-[calc(100%-4rem)]");
  }, [isOpen]);

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <AppBar
      position="static"
      className={`bg-blue-600 shadow-md transition-all duration-300 ml-${isOpen ? "60" : "16"} ${navbarWidth}`}
    >
      <Toolbar className="flex justify-between">
        <Typography variant="h6" className="font-bold">
          My App
        </Typography>
        <div>
          <Link href="/" passHref>
            <Button color="inherit">Home</Button>
          </Link>
          {token ? (
            <Button color="inherit" onClick={handleLogout} className="ml-2">
              Logout
            </Button>
          ) : (
            <Link href="/login" passHref>
              <Button color="inherit" className="ml-2">Login</Button>
            </Link>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
