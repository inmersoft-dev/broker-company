/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-constructed-context-values */
import * as React from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const RouteContext = React.createContext();

const routeReducer = (routeState, action) => {
  return { active: action };
};

const RouteProvider = ({ children }) => {
  const [routeState, setRouteState] = React.useReducer(routeReducer, {
    active: "home",
  });

  const value = { routeState, setRouteState };
  return (
    <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
  );
};

RouteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// hooks
const useRoute = () => {
  const context = React.useContext(RouteContext);
  if (context === undefined)
    throw new Error("routeContext must be used within a Provider");
  return context;
};

export { RouteProvider, useRoute };
