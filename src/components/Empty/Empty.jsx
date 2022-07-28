// @emotion/css
import { css } from "@emotion/css";

// sito components
import SitoContainer from "sito-container";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

const Empty = () => {
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
        className={`${css({
          svg: { width: "60px", height: "60px" },
        })}`}
        data-uk-icon="commenting"
      ></span>
      <h4 className={css({ marginTop: "20px" })}>
        {languageState.texts.Errors.Empty}
      </h4>
    </SitoContainer>
  );
};

export default Empty;
