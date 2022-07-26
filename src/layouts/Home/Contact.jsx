import { useForm } from "react-hook-form";



// sito-image
import SitoImage from "sito-image";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

// image
import background from "../../assets/images/bg1.jpg";

const Contact = () => {
  const { languageState } = useLanguage();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div
      id="section-contact"
      className="uk-section uk-section-large uk-padding-large"
    >
      <div className="uk-container">
        <h2 data-uk-scrollspy="cls: uk-animation-fade;">
          {languageState.texts.Contact.Title}
        </h2>
        <p data-uk-scrollspy="cls: uk-animation-fade;">
          {languageState.texts.Hero.Description}
        </p>
        <div className="uk-child-width-expand@s" data-uk-grid>
          <div
            className="uk-margin uk-visible@s"
            data-uk-scrollspy="cls: uk-animation-slide-left;"
          >
            <SitoImage
              sx={{ objectFit: "cover", height: "100%", marginTop: "10px" }}
              src={background}
              alt="contact"
            />
          </div>
          <form
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
