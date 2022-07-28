import PropTypes from "prop-types";

// @emotion/css
import { css } from "@emotion/css";

// sito components
import SitoContainer from "sito-container";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

const NotConnected = (props) => {
  const { onRetry } = props;
  const { languageState } = useLanguage();
  return (
    <SitoContainer
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        textAlign: "center",
        marginTop: "150px",
      }}
      flexDirection="column"
    >
      <span
        className={`uk-form-danger ${css({
          svg: { width: "60px", height: "60px" },
        })}`}
        data-uk-icon="warning"
      ></span>
      <h4 className={css({ marginTop: "20px" })}>
        {languageState.texts.Errors.NotConnected}
      </h4>
      <button className={`uk-button uk-button-primary`} onClick={onRetry}>
        {languageState.texts.Form.Buttons.Retry}
      </button>
    </SitoContainer>
  );
};

NotConnected.propTypes = {
  onRetry: PropTypes.func,
};

export default NotConnected;
