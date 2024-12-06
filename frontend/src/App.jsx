import { Outlet } from "react-router-dom";
import { Navbar } from "./components";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <div className="min-h-screen bg-gray-900 dark:bg-[#EDF2F7]  text-black dark:text-white">
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Toaster position="bottom-right" toastOptions={{ duration: 1500 }} />
        <Outlet />
      </div>
    </>
  );
}

export default App;
