import { Link } from "react-router-dom";

// @emotion/css
import { css } from "@emotion/css";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

const NotFound = () => {
  const { languageState } = useLanguage();

  return (
    <div
      className={`uk-section uk-section-secondary uk-light ${css({
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      })}`}
    >
      <div
        className={`uk-container ${css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        })}`}
        uk-scrollspy="cls: uk-animation-fade; target: div; delay: 500;"
      >
        <div>
          <h3 className="uk-text-center">
            {languageState.texts.NotFound.Title}
          </h3>
        </div>
        <div>
          <p className="uk-text-center">
            {languageState.texts.NotFound.Description}
          </p>
        </div>
        <div className={css({ display: "flex", justifyContent: "center" })}>
          <Link to="/" className="uk-button uk-button-text">
            {languageState.texts.NotFound.Link}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
