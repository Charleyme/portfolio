import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    // Remove # sign
    const id = hash.replace("#", "");
    const el = document.getElementById(id);

    if (el) {
      // Give React time to render the section before scrolling
      setTimeout(() => {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [hash]);

  return null;
};

export default ScrollToHash;
