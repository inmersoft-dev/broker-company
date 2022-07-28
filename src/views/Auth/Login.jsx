/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// sito components
import SitoContainer from "sito-container";

// own components
import Loading from "../../components/Loading/Loading";
import Navbar from "../../components/Navbar/Navbar";

// @emotion/css
import { css } from "@emotion/css";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";
import { useRoute } from "../../contexts/RouteProvider";
import showNotification from "../../components/Notification/Notification";

// utils
import { userLogged, logUser, createCookie } from "../../utils/auth";

// services
import { login } from "../../services/auth";

import config from "../../config";

const Login = () => {
  const navigate = useNavigate();

  const { languageState } = useLanguage();

  const { setRouteState } = useRoute();

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(1);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(user, password);
      if (response.status === 200) {
        logUser(false, user);
        createCookie(
          config.basicKey,
          response.data.expiration,
          response.data.token
        );
        showNotification(
          "primary",
          languageState.texts.Messages.LoginSuccessful
        );
        setTimeout(() => {
          if (userLogged()) navigate("/dashboard/");
        }, 100);
      } else {
        const { error } = response.data;
        let message;
        if (
          error.indexOf("not found") > -1 ||
          error.indexOf("wrong password") > -1
        )
          message = languageState.texts.Errors.Wrong;
        else if (error.indexOf("Error: Network Error") > -1)
          message = languageState.texts.Errors.NotConnected;
        else message = languageState.texts.Errors.SomeWrong;
        showNotification("danger", message);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      showNotification("danger", languageState.texts.Errors.SomeWrong);
      setLoading(false);
    }
  };

  useEffect(() => {
    setRouteState("login");
    if (userLogged()) navigate("/dashboard/");
    setLoading(false);
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
        case "user":
          return showNotification(
            "danger",
            languageState.texts.Errors.NameRequired
          );
        default:
          return showNotification(
            "danger",
            languageState.texts.Errors.NoEmptyPassword
          );
      }
    }
  };

  return (
    <SitoContainer flexDirection="column" sx={{ width: "100%" }}>
      <Navbar />
      <Loading
        visible={loading}
        sx={{
          zIndex: loading ? 99 : -1,
        }}
      />
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
            onSubmit={onSubmit}
            className="uk-form-stacked uk-width-1-1@xs uk-width-1-3@m"
            data-uk-scrollspy="cls: uk-animation-slide-right;"
          >
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="name">
                {languageState.texts.Form.Inputs.User.label}
              </label>
              <div className="uk-form-controls">
                <input
                  id="user"
                  name="user"
                  required
                  className="uk-input"
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  onInput={validate}
                  onInvalid={invalidate}
                  placeholder={languageState.texts.Form.Inputs.User.placeholder}
                />
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="name">
                {languageState.texts.Form.Inputs.Password.label}
              </label>
              <div className="uk-form-controls">
                <input
                  id="password"
                  name="password"
                  required
                  className="uk-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  onInput={validate}
                  onInvalid={invalidate}
                  placeholder={
                    languageState.texts.Form.Inputs.Password.placeholder
                  }
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
