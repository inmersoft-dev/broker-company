/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useForm } from "react-hook-form";

import PropTypes from "prop-types";

// @emotion/css
import { css } from "@emotion/css";

// sito-image
// import SitoImage from "sito-image";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

// image
// import background from "../../assets/images/bg1.jpg";

const Contact = (props) => {
  const { theme } = props;
  const { languageState } = useLanguage();
  /* const { handleSubmit, register } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  }); */

  /* const onSubmit = (data) => {
    console.log(data);
  }; */

  return (
    <div
      id="section-contact"
      className={`uk-section uk-section-large uk-padding-large uk-section-${theme} ${
        theme !== "default" && theme !== "muted" ? "uk-light" : ""
      } `}
    >
      <div className="uk-container">
        <h2 data-uk-scrollspy="cls: uk-animation-fade;">
          {languageState.texts.Contact.Title}
        </h2>
        <div className="uk-child-width-expand@s" data-uk-grid>
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            })}
          >
            <a
              className={css({
                display: "flex",
                alignItems: "center",
                margin: "10px 20px 10px 0",
              })}
              href={languageState.texts.Contact.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              <span
                className={css({ marginRight: "10px" })}
                data-uk-icon="whatsapp"
              ></span>
              {languageState.texts.Contact.toWhatsapp}
            </a>
            <a
              className={css({
                display: "flex",
                alignItems: "center",
                margin: "10px 20px 10px 0",
              })}
              href={`mailto:${languageState.texts.Contact.email}`}
            >
              <span
                className={css({ marginRight: "10px" })}
                data-uk-icon="mail"
              ></span>
              {languageState.texts.Contact.email}
            </a>
          </div>
          {/* <form
            onSubmit={handleSubmit(onSubmit)}
            className="uk-form-stacked"
            data-uk-scrollspy="cls: uk-animation-slide-right;"
          >
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="name">
                {languageState.texts.Form.Inputs.Name.label}
              </label>
              <div className="uk-form-controls">
                <input
                  id="name"
                  name="name"
                  required
                  className="uk-input"
                  type="text"
                  placeholder={languageState.texts.Form.Inputs.Name.placeholder}
                  {...register}
                />
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="name">
                {languageState.texts.Form.Inputs.Email.label}
              </label>
              <div className="uk-form-controls">
                <input
                  id="name"
                  name="name"
                  required
                  className="uk-input"
                  type="text"
                  placeholder={
                    languageState.texts.Form.Inputs.Email.placeholder
                  }
                  {...register}
                />
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="message">
                {languageState.texts.Form.Inputs.Message.label}
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="uk-textarea"
                rows="5"
                placeholder={
                  languageState.texts.Form.Inputs.Message.placeholder
                }
              />
            </div>
            <button className="uk-button uk-button-primary">
              {languageState.texts.Form.Buttons.Submit}
            </button>
          </form> */}
        </div>
      </div>
    </div>
  );
};

Contact.defaultProps = {
  theme: "default",
};

Contact.propTypes = {
  theme: PropTypes.string,
};

export default Contact;
