import { useEffect, useState } from "react";
import "./Title.scss";
import { motion, AnimatePresence } from 'framer-motion';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AOS from 'aos';
import 'aos/dist/aos.css';
const Title = () => {
  AOS.init();
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
  };
  const textLines = [
    "Embark on an extraordinary adventure through the vastness of our Solar System. Here at Cosmic Odyssey, we believe that the universe is not just something to be studied—it's a place to be experienced. Our mission is to transform the way you see the cosmos, blending the wonders of ancient space history with the thrilling possibilities of the future. Whether you're a curious mind eager to explore or a seasoned space traveler, our platform is your gateway to the stars.",
    "The lifetime of a human being is measured by decades, the lifetime of the Sun is a hundred million times longer. Compared to a star, we are like mayflies, fleeting ephemeral creatures who live out their lives in the course of a single day.",
    "This is an example of showing text one after the other.",
    "We are stardust brought to life, then empowered by the universe to figure itself out and we have only just begun.",
    "We make our world significant by the courage of our questions and the depth of our answers.",
    "When we look up at night and view the stars, everything we see is shinning because of distant nuclear fusion.",
    "The visions we offer our children shape the future.",
    "The universe is a pretty big place. If it's just us, seems like an awful waste of space.",
    "There are as many atoms in a single molecule of your DNA as there are stars in the typical galaxy. We are, each of us, a little universe.",
    "Across the sea of space, the stars are other suns",
    "By looking far out into space we are also looking far back into time, back toward the horizon of the universe, back toward the epoch of the Big Bang.",
    "Cosmos is a Greek word for the order of the universe. It is, in a way, the opposite of Chaos. It implies the deep interconnectedness of all things. It conveys awe for the intricate and subtle way in which the universe is put together.",
    "Not explaining science seems to me perverse. When you're in love, you want to tell the world.",
    "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.",
    "Exploration is in our nature. We began as wanderers, and we are wanderers still. We have lingered long enough on the shores of the cosmic ocean. We are ready at last to set sail for the stars",
    "The lifetime of a human being is measured by decades, the lifetime of the Sun is a hundred million times longer. Compared to a star, we are like mayflies, fleeting ephemeral creatures who live out their lives in the course of a single day.",
  ];

  const handleClick = () => {
    if (currentIndex < textLines.length) {
      setDisplayText(textLines[currentIndex] + "\n");
      setCurrentIndex(currentIndex + 1);
    }
  };


  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);


  }, []);
  return (
    <>
      <div className="Title-screen2">

        <div className="scroll-container">
          <div className={scrollY > 490 ? "scale" : "none"} data-aos="fade-up" data-aos-duration="1000" data-aos-once="false" >
            {/* {displayText ? (

              <h1
                className="scaling-text"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={textVariants}
                  >
                    {displayText}

                  </motion.div>
                </AnimatePresence>
              </h1>

            ) : (
              <h1>
                The cosmos is within us. We are made of star-stuff. We are a way for
                the universe to know itself.
              </h1>
            )} */}
               <h1>
                The cosmos is within us. We are made of star-stuff. We are a way for
                the universe to know itself.
              </h1>
            <h6> - Carl Sagan</h6>
            <div className="text-end">
              <button onClick={handleClick}>Next Quate</button>{" "}
              <span>
                <ArrowRightAltIcon />
              </span>
            </div></div>
        </div>


      </div>

      <div className="Title-screen">

        <div className="mobiles">
          {displayText ? (
            <h1
              className="animate__animated animate__fadeInUp"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {displayText}
            </h1>
          ) : (
            <h1>
              The cosmos is within us. We are made of star-stuff. We are a way for
              the universe to know itself.
            </h1>
          )}
          <h6> - Carl Sagan</h6>
          <div className="text-center">
            <button onClick={handleClick}>NEXT QUOTE   </button>{" "}
          </div>
        </div>
      </div>

    </>
  );
};

export default Title;
