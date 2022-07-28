import { useForm } from "react-hook-form";

// sito components
import SitoContainer from "sito-container";

// own components
import Navbar from "../../components/Navbar/Navbar";

// @emotion/css
import { css } from "@emotion/css";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";
import { useRoute } from "../../contexts/RouteProvider";
import { useEffect } from "react";

const Login = () => {
  const { handleSubmit, register } = useForm();
  const { languageState } = useLanguage();

  const { setRouteState } = useRoute();

  const onSubmit = (data) => {};

  useEffect(() => {
    setRouteState("login");
  }, []);

  return (
    <SitoContainer flexDirection="column" sx={{ width: "100%" }}>
      <Navbar />
      <section
        className={`uk-section uk-section-secondary uk-light ${css({
          height: "100vh",
          display: "flex",
          alignItems: "center",
        })}`}
      >
        <div
          className={`uk-container uk-padding-large ${css({
            paddingBottom: 0,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          })}`}
        >
          <h1 data-uk-scrollspy="cls: uk-animation-slide-left;">
            {languageState.texts.Login.Title}
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="uk-form-stacked uk-width-1-1@xs uk-width-1-3@m"
            data-uk-scrollspy="cls: uk-animation-slide-right;"
          >
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="name">
                {languageState.texts.Form.Inputs.User.label}
              </label>
              <div className="uk-form-controls">
                <input
                  id="name"
                  name="name"
                  required
                  className="uk-input"
                  type="text"
                  placeholder={languageState.texts.Form.Inputs.User.placeholder}
                  {...register}
                />
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="name">
                {languageState.texts.Form.Inputs.Password.label}
              </label>
              <div className="uk-form-controls">
                <input
                  id="name"
                  name="name"
                  required
                  className="uk-input"
                  type="text"
                  placeholder={
                    languageState.texts.Form.Inputs.Password.placeholder
                  }
                  {...register}
                />
              </div>
            </div>
            <button className="uk-button uk-button-primary">
              {languageState.texts.Form.Buttons.Login}
            </button>
          </form>
        </div>
      </section>
    </SitoContainer>
  );
};

export default Login;
