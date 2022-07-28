/* eslint-disable jsx-a11y/anchor-is-valid */
// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

// @emotion/css
import { css } from "@emotion/css";

// sito components
import SitoContainer from "sito-container";

// own components
import Navbar from "../../components/Navbar/Navbar";

// layouts
import Insert from "../../layouts/Dashboard/Insert";
import List from "../../layouts/Dashboard/List";
import Modify from "../../layouts/Dashboard/Modify";
import Delete from "../../layouts/Dashboard/Delete";

const Dashboard = () => {
  const { languageState } = useLanguage();

  return (
    <SitoContainer flexDirection="column" sx={{ width: "100%" }}>
      <Navbar />
      <div
        id="section-home"
        className={`uk-section uk-section-secondary uk-light ${css({
          minHeight: "100vh !important",
          display: "flex",
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
          <ul
            className="uk-subnav uk-subnav-pill"
            data-uk-switcher="animation: uk-animation-fade"
          >
            {languageState.texts.Dashboard.Tabs.map((item, i) => (
              <li key={item} className={i === 0 ? "uk-active" : ""}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
          <ul className={`uk-switcher uk-margin ${css({ width: "100%" })}`}>
            <li>
              <List />
            </li>
            <li>
              <Insert />
            </li>
            <li>
              <Modify />
            </li>
            <li>
              <Delete />
            </li>
          </ul>
        </div>
      </div>
    </SitoContainer>
  );
};

export default Dashboard;
