// sito components
import SitoContainer from "sito-container";

// layouts
import Hero from "../../layouts/Home/Hero";
import Services from "../../layouts/Home/Services";
import About from "../../layouts/Home/About";
import Contact from "../../layouts/Home/Contact";

const Home = () => {
  return (
    <SitoContainer flexDirection="column" sx={{ width: "100%" }}>
      <Hero />
      <Services />
      <About />
      <Contact />
    </SitoContainer>
  );
};

export default Home;
