/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// @emotion/css
import { css } from "@emotion/css";

// services
import { fetchAll } from "../../services/courses.js";

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
    if (!userLogged()) navigate("/login/");
    retry();
  }, []);

  const margin0 = css({ margin: "0 !important" });

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
          <>
            <h4 className={margin0} data-uk-scrollspy="cls: uk-animation-fade;">
              {languageState.texts.Dashboard.Modify.Select}
            </h4>
            <div class="uk-margin">
              <select
                class="uk-select"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {courses.map((item, i) => (
                  <option key={courses[i].id} value={i}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Delete;
