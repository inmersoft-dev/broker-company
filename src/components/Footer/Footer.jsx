/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
// @emotion/css
import { css } from "@emotion/css";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";
import { useRoute } from "../../contexts/RouteProvider";

// utils
import { scrollTo } from "../../utils/functions";

const Footer = () => {
  const { languageState } = useLanguage();
  const { routeState, setRouteState } = useRoute();
  const { active } = routeState;

  const linkTo = (e) => {
    const { id } = e.target;
    setRouteState(id);
    scrollTo(`section-${id}`);
    if (id !== "login") e.preventDefault();
  };

  const linksCSS = css({
    textTransform: "none !important",
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
          <p data-uk-scrollspy="cls: uk-animation-fade;">
            {languageState.texts.Footer.Section1.Description}
          </p>
          <div
            className={css({
              display: "flex",
              alignItems: "center",
            })}
          >
            <a
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
            ></a>
            <a
              data-uk-icon="whatsapp"
              className={`uk-button uk-button-link ${css({
                marginRight: "20px",
              })}`}
              href="https://www.whatsapp.com/"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
