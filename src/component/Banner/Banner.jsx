
import "./Banner.scss";
import videoOne from "../../video/solar.mp4";
import { Link } from "react-router-dom";
const Slider = () => {
  return (
    <div>
      <div className="video-section">
        <video src={videoOne} muted loop autoPlay></video>
        <div className="video-overly">
          <h4 className="mobiles">SpaceBox</h4>
        </div>
        <div className="container">

          <div className="content">
            <h1>
            Welcome to  <br />
           Our Orrery Web App 
            </h1>
            <p>
            Explore the Solar System like never before with the Orrery Web App! Discover 3D models of planets and celestial bodies, play fun Solar System games, and dive into the world of space exploration. Whether you're here to learn or just enjoy the wonders of space, our app has something for everyone." This version retains the essence while being shorter and direct
            </p>
            <Link to={'/space-Exploration-and-nasa-open-sicence'} className="flex-center more">
              <button className="btn">
                Find Out More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
