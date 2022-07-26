import { useForm } from "react-hook-form";

// @emotion/css
import { css } from "@emotion/css";

// sito components
import SitoImage from "sito-image";

// contexts
import { useLanguage } from "../contexts/LanguageProvider";

// image
import background from "../assets/images/background.jpg";

const Hero = () => {
  const { languageState } = useLanguage();
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth =
    String(now.getMonth() + 1).length === 1
      ? `0${now.getMonth() + 1}`
      : now.getMonth() + 1;
  const nowDay = now.getDate();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      date: `${nowYear}-${nowMonth}-${nowDay}`,
      origin: "",
      destiny: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const formCSS = css({
    // justifyContent: "center",
  });

  return (
    <div
      id="section-home"
      className={`uk-section uk-section-secondary uk-light ${css({
        padding: 0,
      })}`}
    >
      <div
        className="uk-position-relative uk-visible-toggle uk-light"
        tabindex="-1"
        data-uk-slideshow
      >
        <ul className="uk-slideshow-items">
          <li>
            <SitoImage
              sx={{ objectFit: "cover", filter: "brightness(0.5)" }}
              src={background}
              alt="slider-1"
            />
            <div className="uk-position-center uk-position-small">
              <div
                className={`uk-container uk-padding-large ${css({
                  paddingBottom: 0,
                })}`}
              >
                <h1 data-uk-scrollspy="cls: uk-animation-fade;">
                  {languageState.texts.Hero.Title}
                </h1>

                <p data-uk-scrollspy="cls: uk-animation-fade;">
                  {languageState.texts.Hero.Description}
                </p>
              </div>
              <form
                className={`uk-grid-small ${formCSS} uk-padding-large`}
                data-uk-grid
                onSubmit={handleSubmit(onSubmit)}
                data-uk-scrollspy="cls: uk-animation-fade; target: div; delay: 500;"
              >
                <div className="uk-width-1-4@s">
                  <label className="uk-form-label" htmlFor="date">
                    {languageState.texts.Form.Inputs.Date.label}
                  </label>
                  <input
                    id="date"
                    name="date"
                    className="uk-input"
                    type="date"
                    {...register("date")}
                  />
                </div>
                <div className="uk-width-1-4@s">
                  <label className="uk-form-label" htmlFor="origin">
                    {languageState.texts.Form.Inputs.Origin.label}
                  </label>
                  <input
                    id="origin"
                    className="uk-input"
                    type="text"
                    placeholder={
                      languageState.texts.Form.Inputs.Origin.placeholder
                    }
                    {...register("origin")}
                  />
                </div>
                <div className="uk-width-1-4@s">
                  <label className="uk-form-label" htmlFor="destiny">
                    {languageState.texts.Form.Inputs.Destiny.label}
                  </label>
                  <input
                    id="destiny"
                    className="uk-input"
                    type="text"
                    placeholder={
                      languageState.texts.Form.Inputs.Destiny.placeholder
                    }
                    {...register("destiny")}
                  />
                </div>
                <div>
                  <div className={css({ height: "23px" })} />
                  <button className="uk-button uk-button-primary">
                    {languageState.texts.Form.Buttons.Submit}
                  </button>
                </div>
              </form>
            </div>
          </li>
          <li>
            <SitoImage
              sx={{ objectFit: "cover", filter: "brightness(0.5)" }}
              src={background}
              alt="slider-2"
            />
          </li>
          <li>
            <SitoImage
              sx={{ objectFit: "cover", filter: "brightness(0.5)" }}
              src={background}
              alt="slider-3"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Hero;
