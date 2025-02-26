"use client"; 
import { useRouter } from "next/navigation"; // ✅ Benar di Next.js 13+
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { getToken, logoutUser } from "../utils/api";

export default function Navbar({ isOpen, setIsOpen }) {
  const router = useRouter();
  const token = getToken();

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <AppBar
      position="static"
      className="bg-blue-600 shadow-md transition-all duration-300"
    >
      <Toolbar className="flex justify-between ">
        <IconButton
          className="cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon className="text-white" />
        </IconButton>
        <div>
          {token ? (
            <Button color="inherit" onClick={handleLogout} className="ml-2">
              Logout
            </Button>
          ) : (
            <Link href="/login" passHref>
              <Button color="inherit" className="ml-2">
                Login
              </Button>
            </Link>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
