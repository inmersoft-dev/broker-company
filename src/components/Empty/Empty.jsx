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
      <span data-uk-icon="commenting"></span>
      <h4>{languageState.texts.Errors.Empty}</h4>
    </SitoContainer>
  );
};

export default Empty;
