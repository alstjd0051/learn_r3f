import React from "react";
import { useTheme } from "../../hooks/theme";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const handleToggle = () => {
    toggleTheme();
  };
  return (
    <nav className="flex h-20 items-center justify-between bg-transparent fixed z-50">
      <button onClick={handleToggle} className="cursor-pointer text-2xl ">
        {theme ? "🌞" : "🌜"}
      </button>
    </nav>
  );
};

export default Header;
