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
        {/*<div
          className={`uk-grid-match uk-child-width-1-3@m`}
          data-uk-grid
          data-uk-scrollspy="cls: uk-animation-fade; target: div; delay: 500;"
        >
          <div>
            <h5>
              <span className={marginRight} data-uk-icon="users" />
              {languageState.texts.About.Section1.Title}
            </h5>

            <p>{languageState.texts.About.Section1.Description}</p>
          </div>
          <div>
            <h5>
              <span className={marginRight} data-uk-icon="rss" />
              {languageState.texts.About.Section2.Title}
            </h5>

            <p>{languageState.texts.About.Section2.Description}</p>
          </div>
          <div>
            <h5>
              <span className={marginRight} data-uk-icon="commenting" />
              {languageState.texts.About.Section3.Title}
            </h5>

            <p>{languageState.texts.About.Section3.Description}</p>
          </div>
        </div>*/}
      </div>
    </div>
  );
};

export default About;
