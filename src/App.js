import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// sito components
import SitoContainer from "sito-container";

// own components
import ToTop from "./components/ToTop/ToTop";
import Estimate from "./components/Estimate/Estimate";

// views
import Home from "./views/Home/Home";
import Courses from "./views/Courses/Courses";
import Login from "./views/Auth/Login";
import Logout from "./views/Auth/Logout";
import Dashboard from "./views/Dashboard/Dashboard";
import Details from "./views/Courses/Details";
import NotFound from "./views/NotFound/NotFound";

// functions
import { userLogged, logoutUser } from "./utils/auth";

// services
import { validateBasicKey } from "./services/auth";

// contexts
import { useLanguage } from "./contexts/LanguageProvider";

const App = () => {
  const { setLanguageState } = useLanguage();

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

  useEffect(() => {
    console.log("hola", navigator.languages[0].split("-")[0]);
    if (navigator.languages && navigator.languages.length)
      setLanguageState({
        type: "set",
        lang: navigator.languages[0].split("-")[0],
      });
    else if (navigator.language && navigator.language.split("-"))
      setLanguageState({ type: "set", lang: navigator.language.split("-")[0] });
  });

  return (
    <SitoContainer ignoreDefault sx={{ width: "100vw" }}>
      <ToTop />
      <Estimate />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/courses" element={<Courses />} />
          <Route exact path="/details" element={<Details />} />
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
