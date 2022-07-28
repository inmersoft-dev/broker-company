import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

// sito components
import SitoContainer from "sito-container";

// own components
import ToTop from "./components/ToTop/ToTop";

// views
import Home from "./views/Home/Home";
import Login from "./views/login/Login";
import Logout from "./views/login/Logout";
import Dashboard from "./views/Dashboard/Dashboard";
import NotFound from "./views/NotFound/NotFound";

// functions
import { userLogged, logoutUser } from "./utils/auth";

// services
import { validateBasicKey } from "./services/auth";

const App = () => {
  const fetch = async () => {
    const value = await validateBasicKey();
    if (!value) {
      logoutUser();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  useEffect(() => {
    if (userLogged()) fetch();
  }, []);

  return (
    <SitoContainer ignoreDefault sx={{ width: "100vw" }}>
      <ToTop />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </SitoContainer>
  );
};

export default App;
