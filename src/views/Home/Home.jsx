// sito components
import SitoContainer from "sito-container";

// own components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// layouts
import Hero from "../../layouts/Home/Hero";
import Services from "../../layouts/Home/Services";
import About from "../../layouts/Home/About";

const Home = () => {
  return (
    <SitoContainer flexDirection="column" sx={{ width: "100%" }}>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Footer />
    </SitoContainer>
  );
};

export default Home;
