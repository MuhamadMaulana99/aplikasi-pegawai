// src/context/HydrationContext.js
import { createContext, useContext, useEffect, useState } from "react";

// Buat Context
const HydrationContext = createContext(false);

// Provider untuk membagikan state ke semua komponen
export function HydrationProvider({ children }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <HydrationContext.Provider value={isHydrated}>
      {children}
    </HydrationContext.Provider>
  );
}

// Custom Hook untuk membaca status hydration
export function useHydrated() {
  return useContext(HydrationContext);
}
