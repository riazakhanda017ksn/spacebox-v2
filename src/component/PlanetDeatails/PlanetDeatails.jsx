// src/SolarSystem.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Import custom images
import earthImage from '../../image/img/earth.png';
import marsImage from '../../image/img/mars.png';
import saturnImage from '../../image/img/saturn.png';
import venusImage from '../../image/img/venus.png';
import jupiterImage from '../../image/img/jupiter.png';
import sunImage from '../../image/img/sun-1.png';
import { Link } from 'react-router-dom';

// Array of planets with their respective custom images
const planets = [
  { name: 'Earth', imageUrl: earthImage },
  { name: 'Mars', imageUrl: marsImage },
  { name: 'Saturn', imageUrl: saturnImage },
  { name: 'Venus', imageUrl: venusImage },
  { name: 'Jupiter', imageUrl: jupiterImage },
  { name: 'Sun', imageUrl: sunImage },
];

const SolarSystem = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          planets.map(async (planet) => {
            // Fetch planet data from the Le Systeme Solaire API
            const bodyResponse = await axios.get(
              `https://api.le-systeme-solaire.net/rest/bodies/${planet.name.toLowerCase()}`
            );
            return { ...bodyResponse.data, imageUrl: planet.imageUrl };
          })
        );
        setData(responses);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to determine which body the planet revolves around
  const getOrbitInfo = (planetName) => {
    if (planetName === 'Sun') {
      return 'The Sun does not revolve around anything.';
    }
    return `Revolves around the Sun.`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{color:'white'}} className='container orrey-info'>
    <h1 style={{textAlign:'center',marginBottom:'80px'}} >Orrery Solar System Information</h1>
      <div className="planets">
      {data.map((body) => (
        <div key={body.id} style={{ marginBottom: '20px' }} className='border'>
             {body.imageUrl && (
            <img
              src={body.imageUrl}
              alt={body.englishName}
              style={{ width: '300px', height: 'auto' }}
            />
          )}
          <h2>{body.englishName}</h2>
          <p className='margin-none'><strong>Distance from Sun:</strong> {body.semimajorAxis} km</p>
          <p className='margin-none'><strong>Rotation Period:</strong> {body.sideralRotation} hours</p>
          <p className='margin-none'>
            <strong>Orbital Information:</strong> {getOrbitInfo(body.englishName)}
          </p>
       
        </div>
      ))}
    </div>
    <div className="explore-more">
      <Link to="/learn-more-about-the-planet">Explore More</Link>
    </div>
    </div>
  );
};

export default SolarSystem;
