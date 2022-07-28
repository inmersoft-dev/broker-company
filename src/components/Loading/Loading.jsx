// prop-types
import PropTypes from "prop-types";

// sito components
import SitoContainer from "sito-container";

const Loading = (props) => {
  const { sx, visible } = props;

  return (
    <SitoContainer
      sx={{
        opacity: visible ? 1 : 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 400ms ease",
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        backdropFilter: "blur(4px)",
        background: `#222`,
        borderRadius: "1rem",
        ...sx,
      }}
    >
      <div data-uk-spinner />
    </SitoContainer>
  );
};

Loading.defaultProps = {
  sx: {},
  visible: false,
};

Loading.propTypes = {
  sx: PropTypes.objectOf(PropTypes.any),
  visible: PropTypes.bool,
};

export default Loading;
