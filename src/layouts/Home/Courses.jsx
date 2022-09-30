/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

// @emotion/css
import { css } from "@emotion/css";

// sito components
import SitoContainer from "sito-container";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

// images
import bg1 from "../../assets/images/bg1.jpg";

const Courses = (props) => {
  const { languageState } = useLanguage();
  const navigate = useNavigate();

  return (
    <div
      id="section-contact"
      className={`uk-section uk-section-primary uk-section-large uk-padding-large ${css(
        {
          background: `url('${bg1}') !important`,
          backgroundPosition: "center",
          backgroundSize: "cover !important",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }
      )}`}
    >
      <div
        className={`uk-section-primary ${css({
          zIndex: 1,
          opacity: 0.7,
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          position: "absolute",
        })}`}
      ></div>
      <div
        className={`uk-container ${css({
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          width: "100%",
          zIndex: 2,
        })}`}
      >
        <h2 data-uk-scrollspy="cls: uk-animation-fade;">
          {languageState.texts.Courses.Title}
        </h2>
        <SitoContainer
          ignoreDefault
          data-uk-grid
          sx={{ alignItems: "flex-start" }}
        >
          <p data-uk-scrollspy="cls: uk-animation-fade;">
            {languageState.texts.Courses.Description}
          </p>
          <button
            onClick={() => navigate("courses")}
            className="uk-button uk-button-secondary"
          >
            {languageState.texts.Courses.Button}
          </button>
        </SitoContainer>
      </div>
    </div>
  );
};

Courses.defaultProps = {
  theme: "default",
};

Courses.propTypes = {
  theme: PropTypes.string,
};

export default Courses;
