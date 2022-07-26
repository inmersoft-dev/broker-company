import { useEffect, useState, useCallback } from "react";

// @emotion/css
import { css } from "@emotion/css";

// functions
import { scrollTo } from "../../utils/functions";

const ToTop = () => {
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
      className={`uk-button uk-button-primary ${css({
        borderRadius: "100%",
        position: "fixed",
        right: 10,
        bottom: 10,
        padding: "5px",
        minWidth: 0,
        transition: "all 500ms ease",
        lineHeight: 0,
        transform: visible ? "scale(1)" : "scale(0)",
        zIndex: visible ? 23 : -1,
      })}`}
    >
      <span data-uk-icon="arrow-up"></span>
    </button>
  );
};

export default ToTop;
