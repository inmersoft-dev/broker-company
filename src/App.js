import { BrowserRouter, Routes, Route } from "react-router-dom";

// own components
import Navbar from "./components/Navbar/Navbar";

// views
import Home from "./views/Home/Home";
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";
import Restore from "./views/Auth/Restore";
import NotFound from "./views/NotFound/NotFound";
import SitoContainer from "sito-container";

const App = () => {
  return (
    <SitoContainer sx={{ width: "100vw" }}>
      <Navbar />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/auth" element={<Login />}>
            <Route exact path="/auth/register" element={<Register />} />
            <Route exact path="/auth/restore" element={<Restore />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </SitoContainer>
  );
};

export default App;
