/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

// @emotion/css
import { css } from "@emotion/css";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

const Card = (props) => {
  const { title, description, link, index } = props;
  const { languageState } = useLanguage();

  const textLeft = css({
    textAlign: "left",
  });

  const margin = css({
    margin: "20px",
    "@media (min-width: 960px)": {
      flex: 1,
    },
  });

  return (
    <div
      className={`uk-card uk-card-default uk-card-body uk-card-hover uk-padding ${margin}`}
    >
      <h3
        className={`uk-card-title ${
          index === 2
            ? css({ height: "0px", margin: 0, marginBottom: "3px" })
            : ""
        }`}
      >
        {title}
      </h3>
      <p
        className={`${
          index === 0 ? css({ margin: 0, marginBottom: "4px !important" }) : ""
        }`}
      >
        {description}
      </p>
      {link && (
        <Link to={link} className={`uk-button uk-button-text ${textLeft}`}>
          {languageState.texts.Form.Buttons.ReadMore}
        </Link>
      )}
    </div>
  );
};

Card.defaultProps = {
  link: "",
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string,
  index: PropTypes.number.isRequired,
};

export default Card;
