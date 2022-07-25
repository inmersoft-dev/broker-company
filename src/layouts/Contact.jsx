import { useForm } from "react-hook-form";

// contexts
import { useLanguage } from "../contexts/LanguageProvider";

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
    <div id="section-contact" className="uk-section uk-section-large">
      <div className="uk-container">
        <h2>{languageState.texts.Contact.Title}</h2>
        <p>{languageState.texts.Hero.Description}</p>
        <form onSubmit={handleSubmit(onSubmit)} className="uk-form-stacked">
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
                placeholder={languageState.texts.Form.Inputs.Email.placeholder}
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
              placeholder={languageState.texts.Form.Inputs.Message.placeholder}
            />
          </div>
          <button className="uk-button uk-button-primary">
            {languageState.texts.Form.Buttons.Submit}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
