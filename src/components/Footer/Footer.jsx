/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";

// @emotion/css
import { css } from "@emotion/css";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";
import { useRoute } from "../../contexts/RouteProvider";

// utils
import { scrollTo } from "../../utils/functions";
import { userLogged } from "../../utils/auth";

const Footer = () => {
  const { languageState } = useLanguage();
  const { routeState, setRouteState } = useRoute();
  const { active } = routeState;

  const linkTo = (e) => {
    const { id } = e.target;
    setRouteState(id);
    scrollTo(`section-${id}`);
    if (
      active !== "login" &&
      active !== "dashboard" &&
      id !== "login" &&
      id !== "dashboard"
    )
      e.preventDefault();
  };

  const linksCSS = css({
    textTransform: "none !important",
    textAlign: "left",
    minHeight: "0 !important",
  });

  return (
    <div
      id="footer"
      className="uk-section uk-section-secondary uk-section-large uk-light uk-padding-large"
    >
      <div
        className={`uk-child-width-1-2 uk-padding ${css({
          width: "-webkit-fill-available",
        })}`}
        data-uk-grid
      >
        <div
          className={`uk-width-expand@s uk-width-1-2@m ${css({
            flexDirection: "column",
            marginBottom: "30px",
          })}`}
          data-uk-grid
        >
          <h3 data-uk-scrollspy="cls: uk-animation-fade;">
            {languageState.texts.CompanyName}
          </h3>
          <p>{languageState.texts.Footer.Section1.Description}</p>
          <div
            className={css({
              display: "flex",
              alignItems: "center",
            })}
          >
            {/* <a
              data-uk-icon="twitter"
              className={`uk-button uk-button-link ${css({
                marginRight: "20px",
              })}`}
              href="https://www.twitter.com/"
              target="_blank"
              rel="noreferrer"
            ></a>
            <a
              data-uk-icon="facebook"
              className={`uk-button uk-button-link ${css({
                marginRight: "20px",
              })}`}
              href="https://www.facebook.com/"
              rel="noreferrer"
            ></a> */}
            <a
              data-uk-icon="whatsapp"
              className={`uk-button uk-button-link ${css({
                marginRight: "20px",
              })}`}
              href="https://wa.me/147045514854"
              rel="noreferrer"
            ></a>
          </div>
        </div>
        <div
          className={`uk-width-expand@s uk-width-1-2@m ${css({
            marginTop: "0 !important",
          })}`}
          data-uk-grid
        >
          <div className="uk-width-expand@s uk-child-width-1-2@m">
            <h3 data-uk-scrollspy="cls: uk-animation-fade;">
              {languageState.texts.Footer.Section2.Title}
            </h3>
            <ul
              className={`uk-navbar-nav ${css({
                flexDirection: "column",
                alignItems: "baseline",
              })}`}
            >
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
                  className={item.id === active ? "uk-active" : ""}
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
          </div>
          <div className="uk-width-expand@s uk-child-width-1-2@m">
            <h3 data-uk-scrollspy="cls: uk-animation-fade;">
              {languageState.texts.Footer.Section3.Title}
            </h3>
            <ul
              className={`uk-navbar-nav ${css({
                flexDirection: "column",
                alignItems: "baseline",
              })}`}
            >
              {languageState.texts.Footer.Section3.Links.map((item) => (
                <li
                  key={item.id}
                  className={item.id === active ? "uk-active" : ""}
                >
                  {item.Link ? (
                    <a
                      className={`uk-button uk-button-link ${linksCSS}`}
                      id={item.id}
                      href={item.Link}
                    >
                      {item.Label}
                    </a>
                  ) : (
                    <p className={linksCSS}>{item.Description}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
