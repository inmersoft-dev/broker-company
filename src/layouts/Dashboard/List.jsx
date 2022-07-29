/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// @emotion/css
import { css } from "@emotion/css";

// services
import { fetchAll } from "../../services/courses.js";

// sito components
import SitoImage from "sito-image";
import SitoContainer from "sito-container";

// images
import noProduct from "../../assets/images/no-product.webp";

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

const List = () => {
  const navigate = useNavigate();

  const { languageState } = useLanguage();
  const { setRouteState } = useRoute();

  const [loading, setLoading] = useState(1);
  const [error, setError] = useState(false);

  const [courses, setCourses] = useState([]);
  const [coursesList, setCoursesList] = useState([]);

  const fetch = async () => {
    setLoading(1);
    setError(false);
    try {
      const response = await fetchAll();
      const newCourses = [];
      if (response.status === 200) {
        const { courses } = response.data;
        const data = Object.values(courses);
        if (data.length) {
          data.forEach((item) => {
            newCourses.push(
              <SitoContainer alignItems="center" sx={{ padding: "20px" }}>
                <SitoContainer sx={{ width: "120px", height: "100px" }}>
                  <SitoImage
                    src={item.image || noProduct}
                    alt={item.title}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </SitoContainer>
                <SitoContainer
                  sx={{ width: "100%", marginLeft: "20px" }}
                  flexDirection="column"
                >
                  <h4 className={margin0}>{item.title}</h4>
                  <p className={margin0}>{item.description}</p>
                  <span className={margin0}>{item.price}</span>
                </SitoContainer>
              </SitoContainer>
            );
          });
          setCoursesList(newCourses);
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

  return (
    <>
      <Loading
        visible={loading === 1}
        sx={{
          zIndex: loading === 1 ? 99 : -1,
        }}
      />
      <div className={`uk-grid-small ${css({ width: "100%" })}`} data-uk-grid>
        {error && loading === -1 && <Error onRetry={retry} />}
        {loading === -1 && !error && <Empty />}
        {!error && !loading && (
          <SitoContainer
            flexDirection="column"
            alignItems="flex-start"
            className={css({ width: "100%" })}
          >
            <h3 className={margin0} data-uk-scrollspy="cls: uk-animation-fade;">
              {languageState.texts.Dashboard.List.Title}
            </h3>
            {coursesList.map((item, i) => (
              <div
                key={courses[i].id}
                className={css({
                  marginTop: "20px",
                  width: "100%",
                  background: "#36363640",
                })}
                data-uk-scrollspy="cls: uk-animation-fade;"
              >
                {item}
              </div>
            ))}
          </SitoContainer>
        )}
      </div>
    </>
  );
};

export default List;
