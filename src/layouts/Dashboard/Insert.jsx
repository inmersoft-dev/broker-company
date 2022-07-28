import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// @emotion/css
import { css } from "@emotion/css";

// services
import { saveCourse } from "../../services/courses.js";

// sito components
import SitoImage from "sito-image";
import SitoContainer from "sito-container";

// images
import noProduct from "../../assets/images/no-product.webp";

// own components
import Loading from "../../components/Loading/Loading";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider.jsx";
import { useRoute } from "../../contexts/RouteProvider";
import showNotification from "../../components/Notification/Notification";

// utils
import { userLogged } from "../../utils/auth.js";

const Insert = () => {
  const navigate = useNavigate();

  const { languageState } = useLanguage();
  const { setRouteState } = useRoute();

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(true);

  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setLoading(false);
  };

  useEffect(() => {
    setRouteState("dashboard");
    if (!userLogged()) navigate("/auth/");
  }, []);

  useEffect(() => {
    setOk(true);
  }, [ok]);

  const validate = () => {
    setOk(true);
  };

  const invalidate = (e) => {
    e.preventDefault();
    if (ok) {
      const { id } = e.target;
      e.target.focus();
      setOk(false);
      switch (id) {
        case "title":
          return showNotification(
            "danger",
            languageState.texts.Errors.TitleRequired
          );
        case "url":
          return showNotification(
            "danger",
            languageState.texts.Errors.UrlRequired
          );
        default:
          return showNotification(
            "danger",
            languageState.texts.Errors.PriceRequired
          );
      }
    }
  };

  const margin0 = css({ margin: "0 !important" });

  const marginTop20 = css({ marginTop: "20px" });

  return (
    <div
      className={`uk-container uk-padding-large ${css({
        paddingBottom: 0,
        paddingTop: "0 !important",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      })}`}
    >
      <Loading
        visible={loading}
        sx={{
          zIndex: loading ? 99 : -1,
        }}
      />
      <h3 className={margin0} data-uk-scrollspy="cls: uk-animation-slide-left;">
        {languageState.texts.Dashboard.Insert.Title}
      </h3>
      <form
        onSubmit={onSubmit}
        className="uk-form-stacked uk-width-1-1@xs uk-width-2-3@m"
        data-uk-scrollspy="cls: uk-animation-slide-right;"
      >
        <div className="uk-margin">
          <SitoContainer sx={{ flexWrap: "wrap" }}>
            <div
              className={`uk-width-1-1@xs uk-width-expand@m ${css({
                marginRight: "20px",
              })}`}
            >
              <label className={`uk-form-label ${marginTop20}`} htmlFor="name">
                {languageState.texts.Form.Inputs.Title.label}
              </label>
              <div className="uk-form-controls">
                <input
                  id="title"
                  name="title"
                  required
                  className="uk-input"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onInput={validate}
                  onInvalid={invalidate}
                  placeholder={
                    languageState.texts.Form.Inputs.Title.placeholder
                  }
                />
              </div>
            </div>
            <div className="uk-width-1-1@xs uk-width-1-2@m">
              <label className={`uk-form-label ${marginTop20}`} htmlFor="name">
                {languageState.texts.Form.Inputs.Price.label}
              </label>
              <div className="uk-form-controls">
                <input
                  id="price"
                  name="price"
                  required
                  className="uk-input"
                  type="number"
                  value={title}
                  onChange={(e) => setPrice(e.target.value)}
                  onInput={validate}
                  onInvalid={invalidate}
                  placeholder={
                    languageState.texts.Form.Inputs.Price.placeholder
                  }
                />
              </div>
            </div>
          </SitoContainer>
          <div>
            <label className={`uk-form-label ${marginTop20}`} htmlFor="name">
              {languageState.texts.Form.Inputs.Url.label}
            </label>
            <div className="uk-form-controls">
              <input
                id="url"
                name="url"
                required
                className="uk-input"
                type="text"
                value={title}
                onChange={(e) => setUrl(e.target.value)}
                onInput={validate}
                onInvalid={invalidate}
                placeholder={languageState.texts.Form.Inputs.Url.placeholder}
              />
            </div>
          </div>
          <label className={`uk-form-label ${marginTop20}`} htmlFor="name">
            {languageState.texts.Form.Inputs.Description.label}
          </label>
          <div className="uk-form-controls">
            <input
              id="description"
              name="description"
              required
              className="uk-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onInput={validate}
              onInvalid={invalidate}
              placeholder={
                languageState.texts.Form.Inputs.Description.placeholder
              }
            />
          </div>
        </div>
        <button className="uk-button uk-button-primary">
          {languageState.texts.Form.Buttons.Save}
        </button>
      </form>
    </div>
  );
};

export default Insert;
