/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
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

// firebase
import { storage } from "../../utils/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

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
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");

  const [loadingPhoto, setLoadingPhoto] = useState(false);

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await saveCourse(
        title,
        title,
        url,
        price,
        shortDescription,
        description,
        photo
      );
      if (response.status === 200) {
        setPhoto("");
        setTitle("");
        setUrl("");
        setPrice("");
        setShortDescription("");
        setDescription("");
        showNotification(
          "success",
          languageState.texts.Messages.SaveSuccessful
        );
      } else {
        const { error } = response.data;
        let message;
        if (error.indexOf("not found") > -1)
          message = languageState.texts.Errors.Wrong;
        else if (error.indexOf("Error: Network Error") > -1)
          message = languageState.texts.Errors.NotConnected;
        else message = languageState.texts.Errors.SomeWrong;
        showNotification("danger", message);
        window.location.reload();
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

  const validate = () => setOk(true);

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

  const photoParse = (file) => {
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setLoadingPhoto(false);
          setPhoto(url);
        });
      }
    );
  };

  const onUploadPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoadingPhoto(true);
    photoParse(file);
  };

  const uploadPhoto = useCallback((e) => {
    const file = document.getElementById("course-photo");
    if (file !== null) file.click();
  }, []);

  useEffect(() => {
    const image = document.getElementById("no-image");
    if (image !== null) {
      image.onclick = uploadPhoto;
    }
    return () => {
      if (image !== null) {
        image.onclick = undefined;
      }
    };
  }, [uploadPhoto]);

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
      {!loading && (
        <>
          <h3
            className={margin0}
            data-uk-scrollspy="cls: uk-animation-slide-left;"
          >
            {languageState.texts.Dashboard.Insert.Title}
          </h3>
          <form
            onSubmit={onSubmit}
            className="uk-form-stacked uk-width-1-1@xs uk-width-2-3@m"
            data-uk-scrollspy="cls: uk-animation-slide-right;"
          >
            <div className="uk-margin">
              <SitoContainer sx={{ flexWrap: "wrap" }}>
                <div className={`uk-width-1-1@xs uk-width-1-9@m`}>
                  <label
                    className={`uk-form-label ${marginTop20}`}
                    htmlFor="name"
                  >
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
                  <label
                    className={`uk-form-label ${marginTop20}`}
                    htmlFor="name"
                  >
                    {languageState.texts.Form.Inputs.Price.label}
                  </label>
                  <div className="uk-form-controls">
                    <input
                      id="price"
                      name="price"
                      required
                      className="uk-input"
                      type="number"
                      value={price}
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
                <label
                  className={`uk-form-label ${marginTop20}`}
                  htmlFor="name"
                >
                  {languageState.texts.Form.Inputs.Url.label}
                </label>
                <div className="uk-form-controls">
                  <input
                    id="url"
                    name="url"
                    required
                    className="uk-input"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onInput={validate}
                    onInvalid={invalidate}
                    placeholder={
                      languageState.texts.Form.Inputs.Url.placeholder
                    }
                  />
                </div>
              </div>
              <label className={`uk-form-label ${marginTop20}`} htmlFor="name">
                {languageState.texts.Form.Inputs.ShortDescription.label}
              </label>
              <div className="uk-form-controls">
                <input
                  id="shortDescription"
                  name="shortDescription"
                  required
                  className="uk-input"
                  type="text"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  onInput={validate}
                  onInvalid={invalidate}
                  placeholder={
                    languageState.texts.Form.Inputs.ShortDescription.placeholder
                  }
                />
              </div>
              <label className={`uk-form-label ${marginTop20}`} htmlFor="name">
                {languageState.texts.Form.Inputs.Description.label}
              </label>
              <div className="uk-form-controls">
                <textarea
                  className="uk-textarea"
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onInput={validate}
                  onInvalid={invalidate}
                  placeholder={
                    languageState.texts.Form.Inputs.Description.placeholder
                  }
                  id="description"
                  name="description"
                  required
                />
              </div>
              <input
                id="course-photo"
                type="file"
                accept=".jpg, .png, .webp, .gif"
                onChange={onUploadPhoto}
              />
              {loadingPhoto ? (
                <Loading
                  visible={loadingPhoto}
                  sx={{
                    zIndex: loadingPhoto ? 99 : -1,
                    width: "200px",
                    height: "200px",
                    marginTop: "20px",
                    objectFit: "cover",
                    position: "relative",
                  }}
                />
              ) : (
                <SitoContainer ignoreDefault sx={{ margin: "20px 0" }}>
                  <SitoImage
                    src={photo ? photo : noProduct}
                    id="no-image"
                    sx={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </SitoContainer>
              )}
            </div>
            <button className="uk-button uk-button-primary">
              {languageState.texts.Form.Buttons.Save}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Insert;
