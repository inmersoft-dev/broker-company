/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// @emotion/css
import { css } from "@emotion/css";

// services
import { savePassword } from "../../services/auth.js";

// sito components
import SitoContainer from "sito-container";

// own components
import Loading from "../../components/Loading/Loading";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider.jsx";
import { useRoute } from "../../contexts/RouteProvider";
import showNotification from "../../components/Notification/Notification";

// utils
import { userLogged } from "../../utils/auth.js";

const Settings = () => {
  const navigate = useNavigate();

  const { languageState } = useLanguage();
  const { setRouteState } = useRoute();

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(true);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rpassword, setRPassword] = useState("");
  const [showRPassword, setShowRPassword] = useState(false);

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (password !== rpassword) {
      showNotification("danger", languageState.texts.Errors.DifferentPasswords);
      setLoading(false);
      return;
    }
    try {
      const response = await savePassword(password);
      if (response.status === 200) {
        setPassword("");
        setRPassword("");
        showNotification(
          "success",
          languageState.texts.Messages.SaveSuccessful
        );
      } else {
        showNotification("danger", languageState.texts.Errors.SomeWrong);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      showNotification("danger", languageState.texts.Errors.SomeWrong);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    setRouteState("dashboard");
    if (!userLogged()) navigate("/login/");
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
        case "password":
          return showNotification(
            "danger",
            languageState.texts.Errors.PasswordRequired
          );
        default:
          return showNotification(
            "danger",
            languageState.texts.Errors.RPasswordRequired
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
        {languageState.texts.Dashboard.Settings.Title}
      </h3>
      <form
        onSubmit={onSubmit}
        className="uk-form-stacked uk-width-1-1@xs uk-width-2-3@m"
        data-uk-scrollspy="cls: uk-animation-slide-right;"
      >
        <div className="uk-margin">
          <SitoContainer sx={{ flexWrap: "wrap" }}>
            <div className="uk-width-1-1@xs uk-width-1-2@m">
              <label className={`uk-form-label ${marginTop20}`} htmlFor="name">
                {languageState.texts.Form.Inputs.Password.label}
              </label>
              <div className="uk-form-controls">
                <div class="uk-margin">
                  <div class="uk-inline">
                    <a
                      class="uk-form-icon uk-form-icon-flip"
                      href="#"
                      uk-icon={`icon: ${!showPassword ? "lock" : "unlock"}`}
                      onClick={() => setShowPassword(!showPassword)}
                    ></a>
                    <input
                      id="password"
                      name="password"
                      required
                      className="uk-input"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onInput={validate}
                      onInvalid={invalidate}
                      placeholder={
                        languageState.texts.Form.Inputs.Password.placeholder
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="uk-width-1-1@xs uk-width-1-2@m">
              <label className={`uk-form-label ${marginTop20}`} htmlFor="name">
                {languageState.texts.Form.Inputs.RPassword.label}
              </label>
              <div className="uk-form-controls">
                <div class="uk-margin">
                  <div class="uk-inline">
                    <a
                      class="uk-form-icon uk-form-icon-flip"
                      href="#"
                      uk-icon={`icon: ${!showRPassword ? "lock" : "unlock"}`}
                      onClick={() => setShowRPassword(!showRPassword)}
                    ></a>
                    <input
                      id="rpassword"
                      name="rpassword"
                      required
                      className="uk-input"
                      type={showRPassword ? "text" : "password"}
                      value={rpassword}
                      onChange={(e) => setRPassword(e.target.value)}
                      onInput={validate}
                      onInvalid={invalidate}
                      placeholder={
                        languageState.texts.Form.Inputs.Password.placeholder
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </SitoContainer>
        </div>
        <button className="uk-button uk-button-primary">
          {languageState.texts.Form.Buttons.Save}
        </button>
      </form>
    </div>
  );
};

export default Settings;
