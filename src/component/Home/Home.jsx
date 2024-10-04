import Navbar from "../Navbar/Navbar";
import Slider from "../Banner/Banner";
import Title from "../Title/Title";
import SolarAnimatedVideo from "../SolarAnimatedVideo/SolarAnimatedVideo";
import Footer from "../Footer/Footer";
import PlanetDeatails from "../PlanetDeatails/PlanetDeatails";
import SolarSystemText from "../Text/Text";

const Home = () => {
  return (
    <>
      <Navbar />
      <Slider />
      <SolarSystemText/>
      <SolarAnimatedVideo />
      <PlanetDeatails/>
      <Footer />
    </>
  );
};

export default Home;
