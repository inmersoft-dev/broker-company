/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// sito components
import SitoContainer from "sito-container";

// @emotion/css
import { css } from "@emotion/css";

// services
import { fetchAll, deleteCourse } from "../../services/courses.js";

// own components
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import Empty from "../../components/Empty/Empty";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider.jsx";
import { useRoute } from "../../contexts/RouteProvider";
import showNotification from "../../components/Notification/Notification";

// utils
import { userLogged } from "../../utils/auth.js";

const Delete = () => {
  const navigate = useNavigate();

  const { languageState } = useLanguage();
  const { setRouteState } = useRoute();

  const [loading, setLoading] = useState(1);
  const [error, setError] = useState(false);

  const [courses, setCourses] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState(0);

  const fetch = async () => {
    setLoading(1);
    setError(false);
    try {
      const response = await fetchAll();
      if (response.status === 200) {
        const { courses } = response.data;
        const data = Object.values(courses);
        if (data.length) {
          setCourses(data);
          setLoading(0);
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
    if (!userLogged()) navigate("/login/");
    retry();
  }, []);

  const margin0 = css({ margin: "0 !important" });

  const removeCourse = async (e) => {
    try {
      console.log(courses, selectedCourse, courses[Number(selectedCourse)].id);
      const response = await deleteCourse(courses[Number(selectedCourse)].id);
      if (response.status === 200) {
        showNotification(
          "success",
          languageState.texts.Messages.DeletedSuccessful
        );
        retry();
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
  };

  return (
    <>
      <Loading
        visible={loading === 1}
        sx={{
          zIndex: loading === 1 ? 99 : -1,
        }}
      />
      <div className="uk-grid-small" data-uk-grid>
        {error && loading === -1 && <Error onRetry={retry} />}
        {loading === -1 && !error && <Empty />}
        {!error && !loading && (
          <SitoContainer flexDirection="column">
            <h4 className={margin0} data-uk-scrollspy="cls: uk-animation-fade;">
              {languageState.texts.Dashboard.Modify.Select}
            </h4>
            <div className="uk-margin">
              <select
                className="uk-select"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {courses.map((item, i) => (
                  <option key={courses[i].id} value={i}>
                    {item.title}
                  </option>
                ))}
              </select>
              <button
                className={`uk-button uk-button-primary ${css({
                  marginTop: "20px",
                })}`}
                onClick={removeCourse}
              >
                {languageState.texts.Form.Buttons.Delete}
              </button>
            </div>
          </SitoContainer>
        )}
      </div>
    </>
  );
};

export default Delete;
