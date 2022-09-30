// @emotion/css
import { css } from "@emotion/css";

// own components
import Card from "../../components/Card/Card";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

const Projects = () => {
  const { languageState } = useLanguage();

  return (
    <div
      id="section-services"
      className="uk-section uk-section-muted uk-section-large uk-padding-large"
      data-uk-scrollspy="cls: uk-animation-fade; target: .uk-card; delay: 500;"
    >
      <div className="uk-container">
        <h2 className="uk-h2" data-uk-scrollspy="cls: uk-animation-fade;">
          {languageState.texts.Projects.Title}
        </h2>
        <p data-uk-scrollspy="cls: uk-animation-fade;">
          {languageState.texts.Hero.Description}
        </p>
        <div
          className={`uk-child-width-1-1@s uk-child-width-1-2@m uk-child-width-expands@l uk-grid-match ${css(
            {
              justifyContent: "center",
            }
          )}`}
          data-uk-grid
        >
          {languageState.texts.Projects.Services.map((item, i) => (
            <Card
              key={item.title}
              title={item.title}
              description={item.description}
              link={item.link}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
