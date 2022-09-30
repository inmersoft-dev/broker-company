// @emotion/css
import { css } from "@emotion/css";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

const About = () => {
  const { languageState } = useLanguage();

  return (
    <div
      id="section-about"
      className="uk-section uk-section-primary uk-light uk-section-large uk-padding-large"
    >
      <div className="uk-container">
        <h2 data-uk-scrollspy="cls: uk-animation-fade;">
          {languageState.texts.About.Title}
        </h2>
        <p
          data-uk-scrollspy="cls: uk-animation-fade;"
          className={css({
            marginBottom: "50px",
          })}
        >
          {languageState.texts.About.Description}
        </p>
        <h3 data-uk-scrollspy="cls: uk-animation-fade;">
          {languageState.texts.About.Title1}
        </h3>
        <p
          data-uk-scrollspy="cls: uk-animation-fade;"
          className={css({
            marginBottom: "50px",
          })}
        >
          {languageState.texts.About.Description1}
        </p>
      </div>
    </div>
  );
};

export default About;
