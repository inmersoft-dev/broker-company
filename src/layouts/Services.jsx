// @emotion/css
import { css } from "@emotion/css";

// own components
import Card from "../components/Card/Card";

// contexts
import { useLanguage } from "../contexts/LanguageProvider";

const Projects = () => {
  const { languageState } = useLanguage();

  const cards = [
    {
      title: "Card 1",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur",
      link: "/services?id=1",
    },
    {
      title: "Card 2",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur",
      link: "/services?id=2",
    },
    {
      title: "Card 3",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur",
      link: "/services?id=3",
    },
  ];

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
          class={`uk-child-width-1-1@s uk-child-width-1-2@m uk-child-width-expands@l uk-grid-match ${css(
            {
              justifyContent: "center",
            }
          )}`}
          data-uk-grid
        >
          {cards.map((item) => (
            <Card
              key={item.title}
              title={item.title}
              description={item.description}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
