import React, { useState } from "react";

const Header = () => {
  const [dark, setDark] = useState(false);
  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };
  return (
    <div>
      <button onClick={() => darkModeHandler()}>
        {dark && "dark"}
        {!dark && "light"}
      </button>
    </div>
  );
};

export default Header;
