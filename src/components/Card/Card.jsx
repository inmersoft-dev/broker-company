/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

// @emotion/css
import { css } from "@emotion/css";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

const Card = (props) => {
  const { title, description, link } = props;
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
      <h3 className="uk-card-title">{title}</h3>
      <p>{description}</p>
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
};

export default Card;
