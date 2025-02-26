"use client"; 
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useHydrated } from "../src/context/HydrationContext";
import { useState } from "react";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isOpen ? "ml-60" : "ml-0"
        }`}
      >
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
