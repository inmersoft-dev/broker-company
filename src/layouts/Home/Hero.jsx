/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
// import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// @emotion/css
import { css } from "@emotion/css";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

// utils
import { scrollTo } from "../../utils/functions";

// images
import banner from "../../assets/images/headers.webp";

const Hero = () => {
  const { languageState } = useLanguage();
  const [slider, setSlider] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (slider < languageState.texts.Hero.Sliders.length - 1)
        setSlider(slider + 1);
      else setSlider(0);
    }, 10000);
  }, [slider]);

  return (
    <div
      id="section-home"
      className={`uk-section uk-section-secondary uk-light ${css({
        height: "100vh",
        display: "flex",
        alignItems: "center",
        background: `url('${banner}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
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
        {slider === 0 && (
          <div data-uk-scrollspy="cls: uk-animation-fade; target: div; delay: 500;">
            <div>
              <h1 data-uk-scrollspy="cls: uk-animation-fade;">
                {languageState.texts.Hero.Sliders[0].Title}
              </h1>
            </div>
            <div>
              <p data-uk-scrollspy="cls: uk-animation-fade;">
                {languageState.texts.Hero.Sliders[0].Description}
              </p>
            </div>
            <div>
              <button
                onClick={() => scrollTo("section-about")}
                className="uk-button uk-button-primary"
              >
                {languageState.texts.Hero.Sliders[0].Button}
              </button>
            </div>
          </div>
        )}
        {slider === 1 && (
          <div data-uk-scrollspy="cls: uk-animation-fade; target: div; delay: 500;">
            <div>
              <h1 data-uk-scrollspy="cls: uk-animation-fade;">
                {languageState.texts.Hero.Sliders[1].Title}
              </h1>
            </div>
            <div>
              <p data-uk-scrollspy="cls: uk-animation-fade;">
                {languageState.texts.Hero.Sliders[1].Description}
              </p>
            </div>
            <div>
              <a
                href={languageState.texts.Hero.Sliders[1].Link}
                target="_blank"
                rel="noreferrer"
              >
                <button className="uk-button uk-button-primary">
                  {languageState.texts.Hero.Sliders[1].Button}
                </button>
              </a>
            </div>
          </div>
        )}
        {slider === 2 && (
          <div data-uk-scrollspy="cls: uk-animation-fade; target: div; delay: 500;">
            <div>
              <h1 data-uk-scrollspy="cls: uk-animation-fade;">
                {languageState.texts.Hero.Sliders[2].Title}
              </h1>
            </div>
            <div>
              <p data-uk-scrollspy="cls: uk-animation-fade;">
                {languageState.texts.Hero.Sliders[2].Description}
              </p>
            </div>
            <div>
              <button
                onClick={() => navigate("courses")}
                className="uk-button uk-button-primary"
              >
                {languageState.texts.Hero.Sliders[2].Button}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
