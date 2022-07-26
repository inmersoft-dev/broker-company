/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

// sito components
import SitoContainer from "sito-container";

// @emotion/css
import { css } from "@emotion/css";

// own components
import OffCanvas from "../OffCanvas/OffCanvas";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";
import { useRoute } from "../../contexts/RouteProvider";

// utils
import { scrollTo } from "../../utils/functions";

const Navbar = () => {
  const { languageState } = useLanguage();
  const { routeState, setRouteState } = useRoute();
  const { active } = routeState;

  const [transparency, setTransparency] = useState(true);

  const extraCSS = css({
    paddingTop: 0,
    paddingBottom: 0,
    top: 0,
    position: "fixed",
    display: "flex",
    width: "-webkit-fill-available",
    zIndex: 99,
  });

  const logoCSS = css({
    marginLeft: "10px",
    marginBottom: "4px",
  });

  const linksCSS = css({
    textTransform: "none !important",
  });

  const linkTo = (e) => {
    const { id } = e.target;
    setRouteState(id);
    scrollTo(`section-${id}`);
    if (id !== "login") e.preventDefault();
  };

  const onScroll = useCallback(
    (e) => {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      if (top < 100) setTransparency(true);
      else setTransparency(false);
    },
    [setTransparency]
  );

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return (
    <>
      <OffCanvas />
      <nav
        className={`uk-navbar-container uk-padding-large ${extraCSS} ${
          transparency ? "uk-navbar-transparent uk-light" : ""
        }`}
        data-uk-navbar
      >
        <a
          className="uk-navbar-toggle uk-hidden@s"
          data-uk-navbar-toggle-icon
          href="#"
          data-uk-toggle="target: #offcanvas-push"
        />
        <Link to="/" className={`uk-navbar-item uk-logo ${logoCSS}`}>
          {languageState.texts.CompanyName}
        </Link>

        <SitoContainer ignoreDefault className="uk-navbar-right uk-visible@s">
          <ul className="uk-navbar-nav">
            {languageState.texts.Navbar.Links.map((item) => (
              <li
                key={item.label}
                className={item.id === active ? "uk-active" : ""}
              >
                <a
                  className={`uk-button uk-button-link ${linksCSS}`}
                  id={item.id}
                  onClick={linkTo}
                  href={item.to === "#" ? "#" : item.to}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </SitoContainer>
      </nav>
    </>
  );
};

export default Navbar;
