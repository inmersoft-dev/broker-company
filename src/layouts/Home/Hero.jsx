/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
// import { useForm } from "react-hook-form";

// @emotion/css
import { css } from "@emotion/css";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

const Hero = () => {
  const { languageState } = useLanguage();
  // const now = new Date();
  // const nowYear = now.getFullYear();
  /* const nowMonth =
    String(now.getMonth() + 1).length === 1
      ? `0${now.getMonth() + 1}`
      : now.getMonth() + 1;
  */
  // const nowDay = now.getDate();
  /* const { handleSubmit, register } = useForm({
    defaultValues: {
      date: `${nowYear}-${nowMonth}-${nowDay}`,
      origin: "",
      destiny: "",
    },
  }); */

  /* const onSubmit = (data) => {
    console.log(data);
  }; */

  return (
    <div
      id="section-home"
      className={`uk-section uk-section-secondary uk-light uk-section-large uk-padding-large ${css(
        { height: "400px" }
      )}`}
    >
      <div
        className={`uk-container uk-padding-large ${css({
          paddingBottom: 0,
        })}`}
      >
        <h1 data-uk-scrollspy="cls: uk-animation-fade;">
          {languageState.texts.Hero.Slide1.Title}
        </h1>

        <p data-uk-scrollspy="cls: uk-animation-fade;">
          {languageState.texts.Hero.Slide1.Description}
        </p>
      </div>
      {/* <form
          className={`uk-grid-small uk-padding-large`}
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
              required
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
              required
              placeholder={languageState.texts.Form.Inputs.Origin.placeholder}
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
              required
              placeholder={languageState.texts.Form.Inputs.Destiny.placeholder}
              {...register("destiny")}
            />
          </div>
          <div>
            <div className={css({ height: "23px" })} />
            <button className="uk-button uk-button-primary">
              {languageState.texts.Form.Buttons.Submit}
            </button>
          </div>
        </form> */}
    </div>
  );
};

export default Hero;
