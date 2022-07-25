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
      className="uk-section uk-section-muted uk-section-large"
    >
      <div className="uk-container">
        <h2>{languageState.texts.Projects.Title}</h2>
        <div
          class={`uk-child-width-1-3@m uk-grid-small uk-grid-match ${css({
            justifyContent: "center",
          })}`}
          data-uk-grid
        >
          {cards.map((item) => (
            <Card
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
