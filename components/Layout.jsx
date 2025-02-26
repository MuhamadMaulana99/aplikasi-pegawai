import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useHydrated } from "../src/context/HydrationContext";
import { useState } from "react";

const Layout = ({ children }) => {
  const isHydrated = useHydrated();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isHydrated && (
        <div className="flex">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="flex-1">
            <Navbar isOpen={isOpen} />
            <main className="p-4">{children}</main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
