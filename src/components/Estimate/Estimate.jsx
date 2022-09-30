import { useEffect, useState, useCallback } from "react";

// @emotion/css
import { css } from "@emotion/css";

// functions
import { scrollTo } from "../../utils/functions";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

const Estimate = () => {
  const { languageState } = useLanguage();

  const [visible, setVisible] = useState(false);

  const onScroll = useCallback(
    (e) => {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      if (top > 100) setVisible(true);
      else setVisible(false);
    },
    [setVisible]
  );

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return (
    <button
      onClick={scrollTo}
      variant="contained"
      className={`uk-button uk-button-secondary ${css({
        position: "fixed",
        left: 10,
        bottom: 10,
        padding: "5px",
        transition: "all 500ms ease",
        transform: visible ? "scale(1)" : "scale(0)",
        zIndex: visible ? 23 : -1,
      })}`}
    >
      {languageState.texts.Estimate}
    </button>
  );
};

export default Estimate;
