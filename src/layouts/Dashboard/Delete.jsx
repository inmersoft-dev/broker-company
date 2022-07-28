import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

const Delete = () => {
  const navigate = useNavigate();

  const { languageState } = useLanguage();
  const { setRouteState } = useRoute();

  const [loading, setLoading] = useState(1);
  const [error, setError] = useState(false);

  const [courses, setCourses] = useState([]);
  const [coursesDelete, setCoursesDelete] = useState([]);

  const fetch = async () => {
    setLoading(1);
    setError(false);
    try {
      const response = await fetchAll();
      const newCourses = [];
      if (response.status === 200) {
        const { data } = response;
        if (data.length) {
          data.forEach((item) => {
            newCourses.push(
              <SitoContainer alignItems="center">
                <SitoImage
                  src={item.image || noProduct}
                  alt={item.title}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div classClassName="uk-width-expand" data-uk-leader="fill: -">
                  {item.title}
                </div>
                <div>{item.price}</div>
              </SitoContainer>
            );
          });
          setCoursesDelete(newCourses);
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
            {coursesDelete.map((item, i) => (
              <div key={courses[i].id}>{item}</div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Delete;
