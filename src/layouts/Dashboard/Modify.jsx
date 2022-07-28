import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// @emotion/css
import { css } from "@emotion/css";

// services
import { saveCourse, fetchAll } from "../../services/courses.js";

// sito components
import SitoImage from "sito-image";
import SitoContainer from "sito-container";

// images
import noProduct from "../../assets/images/no-product.webp";

// own components
import Loading from "../../components/Loading/Loading";
import Empty from "../../components/Empty/Empty";
import Error from "../../components/Error/Error";

// firebase
import { storage } from "../../utils/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider.jsx";
import { useRoute } from "../../contexts/RouteProvider";
import showNotification from "../../components/Notification/Notification";

// utils
import { userLogged } from "../../utils/auth.js";

const Modify = () => {
  const navigate = useNavigate();

  const { languageState } = useLanguage();
  const { setRouteState } = useRoute();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ok, setOk] = useState(true);

  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [courses, setCourses] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState(0);

  const changeCourse = (e) => {
    const { value } = e.target;
    const valueAsNumber = Number(value);
    setPhoto(courses[valueAsNumber].photo);
    setTitle(courses[valueAsNumber].title);
    setUrl(courses[valueAsNumber].url);
    setPrice(courses[valueAsNumber].price);
    setDescription(courses[valueAsNumber].description);
    setSelectedCourse(valueAsNumber);
  };

  const fetch = async () => {
    setLoading(1);
    setError(false);
    try {
      const response = await fetchAll();
      if (response.status === 200) {
        const { data } = response;
        if (data.length) {
          setCourses(data);
        } else setLoading(-1);
      } else {
        setLoading(-1);
        setError(true);
        showNotification("danger", languageState.texts.Errors.SomeWrong);
      }
    } catch (err) {
      setError(true);
      setLoading(-1);
      showNotification("danger", languageState.texts.Errors.NotConnected);
    }
  };

  const retry = () => fetch();

  useEffect(() => {
    setRouteState("dashboard");
    if (!userLogged()) navigate("/auth/");
    retry();
  }, []);

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await saveCourse(title, url, price, description, photo);
      if (response.status === 200) {
      } else {
        const { error } = response.data;
        let message;
        if (error.indexOf("not found") > -1)
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

  const onUploadPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
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
          setPhoto(url);
        });
      }
    );
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
        visible={loading === 1}
        sx={{
          zIndex: loading === 1 ? 99 : -1,
        }}
      />
      {error && loading === -1 && <Error onRetry={retry} />}
      {loading === -1 && !error && <Empty />}
      {!error && !loading && courses.length && (
        <>
          <h4 className={margin0} data-uk-scrollspy="cls: uk-animation-fade;">
            {languageState.texts.Dashboard.Modify.Select}
          </h4>
          <div class="uk-margin">
            <select
              class="uk-select"
              value={selectedCourse}
              onChange={changeCourse}
            >
              {courses.map((item, i) => (
                <option key={courses[i].id} value={i}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <h3
            className={margin0}
            data-uk-scrollspy="cls: uk-animation-slide-left;"
          >
            {languageState.texts.Dashboard.Modify.Title}
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
                    value={title}
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
                  onChange={(e) => setDescription(e.target.value)}
                  onInput={validate}
                  onInvalid={invalidate}
                  placeholder={
                    languageState.texts.Form.Inputs.Description.placeholder
                  }
                />
              </div>
              <input
                id="course-photo"
                type="file"
                accept=".jpg, .png, .webp, .gif"
                value={photo}
                onChange={onUploadPhoto}
              />
              <SitoImage
                src={photo ? photo : noProduct}
                id="no-image"
                sx={{ width: "200px", height: "200px", marginTop: "20px" }}
              />
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

export default Modify;
