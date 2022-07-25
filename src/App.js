import { BrowserRouter, Routes, Route } from "react-router-dom";

// views
import Home from "./views/Home";

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
