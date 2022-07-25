import { useLanguage } from "../contexts/LanguageProvider";

const Hero = () => {
  const { languageState } = useLanguage();

  return (
    <div className="uk-section uk-section-secondary uk-light uk-section-large">
      <div className="uk-container">
        <h1>{languageState.texts.Hero.Title}</h1>

        <div className="uk-grid-match uk-child-width-1-3@m" data-uk-grid>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </p>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </p>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
