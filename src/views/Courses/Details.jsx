/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// @emotion/css
import { css } from "@emotion/css";

// sito components
import SitoContainer from "sito-container";
import SitoImage from "sito-image";

// own components
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import Empty from "../../components/Empty/Empty";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// services
import { fetchCourse } from "../../services/courses";

// images
import noProduct from "../../assets/images/no-product.webp";

// layouts
import Contact from "../../layouts/Home/Contact";

// contexts
import { useRoute } from "../../contexts/RouteProvider";
import { useLanguage } from "../../contexts/LanguageProvider";

const Details = () => {
  const location = useLocation();

  const { languageState } = useLanguage();
  const { setRouteState } = useRoute();

  const [loading, setLoading] = useState(1);
  const [error, setError] = useState(false);

  const margin0 = css({ margin: "0 !important" });

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  const init = async () => {
    setLoading(1);
    setError(false);
    if (location.search) {
      const idParam = location.search.substring(1);
      const id = idParam.split("=")[1];
      if (id) {
        try {
          const response = await fetchCourse(id);
          if (response.status === 200) {
            const { title, url, price, shortDescription, description, photo } =
              response.data;
            setTitle(title);
            setUrl(url);
            setPrice(price);
            setShortDescription(shortDescription);
            setDescription(description);
            setPhoto(photo);
            setLoading(0);
            setError(false);
          } else {
            setLoading(-1);
            setError(false);
          }
        } catch (error) {
          setLoading(-1);
          setError(true);
        }
      } else {
        setLoading(-1);
        setError(true);
      }
    }
  };

  const retry = () => init();

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
        id="section-course"
        className="uk-section uk-section-secondary uk-light uk-section-large uk-padding-large"
        data-uk-scrollspy="cls: uk-animation-fade; target: .uk-card; delay: 500;"
      >
        <div className={`uk-container ${css({ marginTop: "80px" })}`}>
          {error && loading === -1 && <Error onRetry={retry} />}
          {loading === -1 && !error && <Empty />}
          {!error && !loading && (
            <div className="uk-child-width-expand@s" data-uk-grid>
              <div className={css({ display: "flex", alignItems: "center" })}>
                <SitoContainer
                  flexDirection="column"
                  alignItems="flex-start"
                  className={css({ width: "100%" })}
                >
                  <h2
                    className={margin0}
                    data-uk-scrollspy="cls: uk-animation-fade;"
                  >
                    {title}
                  </h2>
                  <SitoContainer alignItems="center">
                    <a
                      className={css({ marginRight: "20px" })}
                      href={`${languageState.texts.Contact.whatsapp}?text=${languageState.texts.BuyText} ${title}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {languageState.texts.Buy}
                    </a>
                    <p>{price} USD</p>
                  </SitoContainer>
                  <SitoContainer
                    sx={{
                      width: "320px",
                      height: "320px",
                      marginTop: "20px",
                      "@media (max-width: 529px)": {
                        width: "100% !important",
                      },
                    }}
                  >
                    <SitoImage
                      src={photo || noProduct}
                      alt={title}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </SitoContainer>
                  <p>{description}</p>
                </SitoContainer>
              </div>
            </div>
          )}
        </div>
      </div>
      <Contact />
      <Footer />
    </SitoContainer>
  );
};

export default Details;
