/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// @emotion/css
import { css } from "@emotion/css";

// own components
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import Empty from "../../components/Empty/Empty";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// images
import noProduct from "../../assets/images/no-product.webp";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";
import { useRoute } from "../../contexts/RouteProvider";
import showNotification from "../../components/Notification/Notification";

// sito components
import SitoContainer from "sito-container";
import SitoImage from "sito-image";

// layouts
import Contact from "../../layouts/Home/Contact";

// services
import { fetchAll } from "../../services/courses";

const Courses = () => {
  const { languageState } = useLanguage();
  const { setRouteState } = useRoute();

  const [loading, setLoading] = useState(1);
  const [error, setError] = useState(false);

  const [coursesList, setCoursesList] = useState([]);

  const margin0 = css({ margin: "0 !important" });

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
              <Link
                className={css({ textDecoration: "none !important" })}
                to={`/details?id=${item.id}`}
              >
                <SitoContainer
                  alignItems="center"
                  sx={{
                    padding: "20px",

                    "@media (max-width: 529px)": {
                      flexDirection: "column !important",
                    },
                  }}
                >
                  <SitoContainer
                    sx={{
                      width: "120px",
                      height: "100px",
                      "@media (max-width: 529px)": {
                        width: "100% !important",
                      },
                    }}
                  >
                    <SitoImage
                      src={item.image || noProduct}
                      alt={item.title}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </SitoContainer>
                  <SitoContainer
                    sx={{
                      width: "100%",
                      marginLeft: "20px",
                      "@media (max-width: 529px)": {
                        marginLeft: "0 !important",
                        marginTop: " 20px !important",
                      },
                    }}
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <h4 className={margin0}>{item.title}</h4>
                    <p className={margin0}>{item.shortDescription}</p>
                    <span className={margin0}>{item.price} USD</span>
                    <Link
                      className="uk-link-muted"
                      to={`/details?id=${item.id}`}
                    >
                      {languageState.texts.Courses.ReadMore}
                    </Link>
                  </SitoContainer>
                </SitoContainer>
              </Link>
            );
          });
          setCoursesList(newCourses);
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
    setRouteState("courses");
    retry();
  }, []);

  return (
    <SitoContainer flexDirection="column" sx={{ width: "100%" }}>
      <Navbar />
      <Loading
        visible={loading === 1}
        sx={{
          zIndex: loading === 1 ? 99 : -1,
        }}
      />
      <div
        id="section-courses"
        className="uk-section uk-section-secondary uk-light uk-section-large uk-padding-large"
        data-uk-scrollspy="cls: uk-animation-fade; target: .uk-card; delay: 500;"
      >
        <div
          className={`uk-container ${css({ padding: 0, marginTop: "80px" })}`}
        >
          {error && loading === -1 && <Error onRetry={retry} />}
          {loading === -1 && !error && <Empty />}
          {!error && !loading && (
            <SitoContainer
              flexDirection="column"
              alignItems="flex-start"
              className={css({ width: "100%" })}
            >
              <h2 className="uk-h2" data-uk-scrollspy="cls: uk-animation-fade;">
                {languageState.texts.Courses.Title}
              </h2>
              <p data-uk-scrollspy="cls: uk-animation-fade;">
                {languageState.texts.Courses.Description}
              </p>
              <div
                className={`uk-child-width-1-1@s uk-child-width-1-2@m uk-child-width-expands@l uk-grid-match ${css(
                  {
                    justifyContent: "center",
                  }
                )}`}
                data-uk-grid
              >
                <SitoContainer
                  flexDirection="column"
                  alignItems="flex-start"
                  className={css({ width: "100%" })}
                >
                  <h3
                    className={margin0}
                    data-uk-scrollspy="cls: uk-animation-fade;"
                  >
                    {languageState.texts.Dashboard.List.Title}
                  </h3>
                  {coursesList.map((item, i) => (
                    <div
                      key={i}
                      className={css({
                        marginTop: "20px",
                        width: "100%",
                        background: "#36363640",
                        cursor: "pointer",
                        transition: "all 500ms ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                        },
                      })}
                      data-uk-scrollspy="cls: uk-animation-fade;"
                    >
                      {item}
                    </div>
                  ))}
                </SitoContainer>
              </div>
            </SitoContainer>
          )}
        </div>
      </div>
      <Contact />
      <Footer />
    </SitoContainer>
  );
};

export default Courses;
