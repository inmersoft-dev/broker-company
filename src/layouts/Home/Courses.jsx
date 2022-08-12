/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

// sito components
import SitoContainer from "sito-container";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

const Courses = (props) => {
  const { languageState } = useLanguage();
  const navigate = useNavigate();

  return (
    <div
      id="section-contact"
      className="uk-section uk-section-primary uk-section-large uk-padding-large"
    >
      <div className="uk-container">
        <h2 data-uk-scrollspy="cls: uk-animation-fade;">
          {languageState.texts.Courses.Title}
        </h2>
        <SitoContainer
          ignoreDefault
          data-uk-grid
          sx={{ alignItems: "flex-start", button: { color: "#222" } }}
        >
          <p data-uk-scrollspy="cls: uk-animation-fade;">
            {languageState.texts.Courses.Description}
          </p>
          <button onClick={() => navigate("courses")} className="uk-button">
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
