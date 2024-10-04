

import { useEffect, useState } from "react";
const SolarSystemText = () => {
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
      <div className="main remove" style={{paddingBottom:'100px'}}>
        <div className="solar-background ">
          <div className="content-of-solar-sytem">
            <div className="container">
            <h1 className={scrollY > 821 && "text-style"}>Solar System And <br />
            Near-Earth Object Visualization</h1>
            
          </div></div>
          {/*  */}

        </div>
       
      </div>
      <div className="mobiles">
        <div className="solar-system">
          <h4>
            History of the planets of <br /> the Solar system
          </h4>
         
        </div>
      </div>
    </>
  );
};

export default SolarSystemText;
