import { BrowserRouter, Routes, Route } from "react-router-dom";

// sito components
import SitoContainer from "sito-container";

// own components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ToTop from "./components/ToTop/ToTop";

// views
import Home from "./views/Home/Home";
/* import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";
import Restore from "./views/Auth/Restore"; */
import NotFound from "./views/NotFound/NotFound";

const App = () => {
  return (
    <SitoContainer ignoreDefault sx={{ width: "100vw" }}>
      <Navbar />
      <ToTop />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/*<Route exact path="/auth" element={<Login />}>
            <Route exact path="/auth/register" element={<Register />} />
            <Route exact path="/auth/restore" element={<Restore />} />
          </Route>*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </SitoContainer>
  );
};

export default App;
