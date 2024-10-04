import React, { useState, useEffect } from 'react';
import './Solar.scss';
import vv from '../../video/11.mp4';
import earthImage from '../../image/img/earth.png';
import saturnImage from '../../image/img/saturn.png';
import venusImage from '../../image/img/venus.png';
import jupiterImage from '../../image/img/jupiter.png';
import sunImage from '../../image/img/sun-1.png';
import marcuryImage from '../../image/img/mercury.png';
import marss from '../../image/img/mars.png';
import Neptune from '../../image/img/neptune.png';
import Moon from '../../image/img/moon.png';
import img from '../../image/game.gif';
import img2 from '../../image/Happy-Emoji-PNG-removebg-preview.png';
import img3 from '../../image/r.png';
import { Link } from 'react-router-dom';

const NASA_API_KEY = 'pn2ByUA60ibdKfynTm72cKlUVSHrgst4djyFOoRq';

const planets = [
  { name: 'Mercury', image: marcuryImage },
  { name: 'Venus', image: venusImage },
  { name: 'Earth', image: earthImage },
  { name: 'Mars', image: marss },
  { name: 'Jupiter', image: jupiterImage },
  { name: 'Saturn', image: saturnImage },
  { name: 'Sun', image: sunImage },
  { name: 'Neptune', image: Neptune },
  { name: 'Moon', image: Moon },
];

const gameDuration = 60;

function Solar() {
  const [score, setScore] = useState(0);
  const [targetPlanet, setTargetPlanet] = useState('');
  const [timeLeft, setTimeLeft] = useState(gameDuration);
  const [gameStarted, setGameStarted] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showName, setShowName] = useState({});
  const numberArray = [55, 60, 65, 70, 75, 80];
  const [randomIndex, setRandomIndex] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
        const data = await response.json();
        console.log(data); // You can use this data as needed
      } catch (error) {
        console.error("Error fetching data from NASA API:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (gameStarted && !gameOver && !gamePaused && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameStarted, gamePaused, gameOver]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const randomPlanet = planets[Math.floor(Math.random() * planets.length)].name;
      setTargetPlanet(randomPlanet);
    }
  }, [score, gameStarted, gameOver]);

  const handleStartClick = () => {
    const newIndex = Math.floor(Math.random() * numberArray.length);
    const newRandomNumber = numberArray[newIndex];
    setRandomIndex(newIndex);
    setRandomNumber(newRandomNumber);
    setGameStarted(true);
  };

  const handlePauseClick = () => {
    setGamePaused(!gamePaused);
  };

  const handlePlanetClick = (clickedPlanet) => {
    setShowName((prev) => ({ ...prev, [clickedPlanet]: true }));
    if (clickedPlanet === targetPlanet) {
      setScore(score + 1);
    }
  };

  const handleReloadClick = () => {
    window.location.reload();
  };

  return (
    <>
      <div>
        <div className="video-section" style={{ height: "100vh" }}>
          <video src={vv} muted loop autoPlay></video>
          <div className="video-overly" style={{ opacity: '0.5' }}></div>
          <div className="container">
            <div className="home__">
              <Link to={'/'}>Go Home</Link>
            </div>
            <div className="grid-stystem">
              <div className="cols-7">
                <div className="solar-system-game">
                  {!gameStarted ? (
                    <div className='game_start'>
                      {!gameStarted && <img src={img} alt="" />}
                    </div>
                  ) : (
                    <>
                      {gameOver ? (
                        <div className="game-over">
                          <h1>Game Over! Your Score: {score}</h1>
                          <img src={score === randomNumber || score > randomNumber ? img2 : img3} alt="" />
                          <p>{score === randomNumber || score > randomNumber ? 'You are Winner!' : 'You failed! Try again.'}</p>
                          <a href="">Let,s Play Again</a>
                        </div>
                      ) : (
                        <div className='title'>
                          <h2>Click on the <span>{targetPlanet}</span> </h2>
                          <div className='main_'>
                            <div className="change-positon">
                              <h4>Time Left: {timeLeft} seconds</h4>
                            </div>
                            <div className="planets-item">
                              {planets.map((planet) => (
                                <div key={planet.name} className={`planet-container ${planet.name === targetPlanet ? 'target' : ''}`}>
                                  <img
                                    src={planet.image}
                                    alt={planet.name}
                                    className="planet-image"
                                    onClick={() => handlePlanetClick(planet.name)}
                                  />
                                  <p className="planet-name">{planet.name}</p>
                                </div>
                              ))}
                            </div>
                            <div className="position-change">
                              <p>Score Target: {randomNumber}</p>
                              <p>Your Game Score: {score}</p>
                              <div className="flexs-button">
                                <button onClick={handlePauseClick}>{gamePaused ? 'Resume Game' : 'Pause Game'}</button>
                                <button onClick={handleReloadClick}>Reset Game</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="cols-5">
                {
                  !gameStarted && (
                    <div className="description__">
                      <h1>Learn the Solar System by Clicking</h1>
                      <button onClick={handleStartClick}>Start Game</button>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Solar;
