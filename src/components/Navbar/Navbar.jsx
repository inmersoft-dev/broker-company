/* eslint-disable react-hooks/exhaustive-deps */
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
import { userLogged } from "../../utils/auth";

const Navbar = () => {
  const { languageState } = useLanguage();
  const { routeState, setRouteState } = useRoute();
  const { active } = routeState;

  const [dark] = useState(false);
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
    marginBottom: "2px",
  });

  const marginRight = css({
    marginRight: "20px !important",
  });

  const linksCSS = css({
    textTransform: "none !important",
  });

  const linkTo = (e) => {
    const { id } = e.target;
    setRouteState(id);
    scrollTo(`section-${id}`);
    if (
      active !== "login" &&
      active !== "dashboard" &&
      active !== "courses" &&
      id !== "login" &&
      id !== "dashboard" &&
      id !== "courses"
    )
      e.preventDefault();
  };

  const onScroll = useCallback(
    (e) => {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      if (top < 50) setTransparency(true);
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

  const darkBar = css({
    background: "#222 !important",
  });

  return (
    <>
      <OffCanvas />
      <nav
        className={`uk-navbar-container uk-padding-large ${extraCSS} ${
          transparency && !dark ? "uk-navbar-transparent uk-light" : ""
        } ${dark ? `${darkBar} uk-light` : ""}`}
        data-uk-navbar
      >
        <a
          className={`uk-navbar-toggle ${
            !userLogged() ? "uk-hidden@s" : "uk-hidden@m"
          }`}
          data-uk-navbar-toggle-icon
          href="#"
          data-uk-toggle="target: #offcanvas-push"
        />
        <Link to="/" className={`uk-navbar-item uk-logo ${logoCSS}`}>
          {languageState.texts.CompanyName}
        </Link>

        <SitoContainer
          ignoreDefault
          className={` uk-navbar-right ${
            !userLogged() ? "uk-visible@s" : "uk-visible@m"
          }`}
        >
          <ul className={`uk-navbar-nav ${css({ gap: "0 !important" })}`}>
            {languageState.texts.Navbar.Links.filter((item) => {
              if (
                (item.logged === 2 && userLogged()) ||
                !item.logged ||
                (item.logged === 1 && !userLogged())
              )
                return item;
              return null;
            }).map((item) => (
              <li
                key={item.label}
                className={`${marginRight} ${
                  item.id === active ? "uk-active" : ""
                }`}
              >
                <Link
                  className={`uk-button uk-button-link ${linksCSS}`}
                  id={item.id}
                  onClick={linkTo}
                  to={item.to}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </SitoContainer>
      </nav>
    </>
  );
};

export default Navbar;
