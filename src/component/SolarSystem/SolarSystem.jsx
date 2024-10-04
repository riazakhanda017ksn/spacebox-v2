import "./SolarSystem.scss";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import { Link } from "react-router-dom";
import { items } from "../Data/Data";

import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
const SolarSystem = () => {
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
    <Navbar/>
    <div className="container">
      <div className="main" style={{paddingTop:"220px",paddingBottom:"80px"}}>
        <div className="solar-background ">
          <div className="content-of-solar-sytem">
            <h1 className={scrollY > 821 && "text-style"}>Learn More about <br />
              the Solar system Planets</h1>
            <div className="cards">
              {items.map((item) => {
                return (
                  <div key={item.id} className={item?.className + " " + "solar_item" + " " + item?.borderBottom}>

                    <img src={item.img} alt="" />
                    <h3>{item.name}</h3>
                    <p>{item.history1.slice(0, 170)}...</p>
                    <div className="text-center">
                      <Link to={`/solar-system-details/${item.id}`}>
                        Read more <ArrowRightAltOutlinedIcon />{" "}
                      </Link>


                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/*  */}

        </div>
       
      </div>
      <div className="mobiles">
        <div className="solar-system">
          <h4>
            History of the planets of <br /> the Solar system
          </h4>
          <div className="parent">
            {items.map((item) => {
              return (
                <div key={item.id} className="item">
                  <img src={item.img} alt="" />
                  <h3>{item.name}</h3>
                  <p>{item.history1.slice(0, 50)}...</p>
                  <div className="text-center">
                    <Link to={`/solar-system-details/${item.id}`}>
                      Read more <ArrowRightAltOutlinedIcon />{" "}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div></div>
      <Footer/>
    </>
  );
};

export default SolarSystem;
