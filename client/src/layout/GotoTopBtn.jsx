import React, { useEffect, useState } from "react";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
const GotoTopBtn = () => {
  const [isVisible, setVisibility] = useState(false);
  function GotoTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
  const listenToScroll = () => {
    const heightToHidden = 1000;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    setVisibility(heightToHidden < winScroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);
  return (
    <>
      {" "}
      {isVisible && (
        <div className="animate-bounce z-50 fixed bottom-[8rem] right-8  text-white">
          <button
            class="cursor-pointer group block px-4 py-2 rounded-full    bg-black text-white text-4xl font-bold shadow-2xl hover:scale-110 transition active:scale-90"
            onClick={() => GotoTop()}
          >
            <span class=" group-hover:[text-shadow:3px_3px_6px_var(--tw-shadow-color)] shadow-white">
              {" "}
              <ArrowUpwardIcon style={{ fontSize: "30px" }} />
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default GotoTopBtn;
