// import React, { Suspense } from "react";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import * as THREE from "three";
// import sunTexture from "../../image/texture/download7.jpeg";
// import "./SolarSystemThree.scss";
// import tx1 from "../../image/texture/download.jpeg";
// import tx2 from "../../image/texture/download2.jpeg";
// import tx3 from "../../image/texture/download3.jpeg";
// import tx4 from "../../image/texture/download4.jpeg";
// import tx5 from "../../image/texture/download5.jpeg";
// import tx6 from "../../image/texture/download6.jpeg";

// export default function SolarSystemThree() {
//   const random = (a, b) => a + Math.random() * b;
//   const randomInt = (a, b) => Math.floor(random(a, b));
//   const randomColor = () =>
//     `rgb(${randomInt(80, 50)}, ${randomInt(80, 50)}, ${randomInt(80, 50)})`;
//   const shuffle = (a) => {
//     const temp = a.slice(0);
//     for (let i = temp.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [temp[i], temp[j]] = [temp[j], temp[i]];
//     }
//     return temp;
//   };

//   const textures = shuffle([tx1, tx2, tx3, tx4, tx5, tx6]);

//   const planetData = [];
//   const totalPlanets = 6;
//   for (let index = 0; index < totalPlanets; index++) {
//     planetData.push({
//       id: index,
//       color: randomColor(),
//       xRadius: (index + 1.5) * 4,
//       zRadius: (index + 1.5) * 2,
//       size: random(0.5, 1),
//       speed: random(0.1, 0.6),
//       offset: random(0, Math.PI * 2),
//       rotationSpeed: random(0.01, 0.03),
//       textureMap: textures[index]
//     });
//   }
//   return (
//     <div className="rooot">
//       <Canvas camera={{ position: [0, 20, 25], fov: 45 }} style={{bottom:"70px"}}>
//         <Suspense fallback={null}>
//           <Sun />
//           {planetData.map((planet) => (
//             <Planet planet={planet} key={planet.id} />
//           ))}
//           <Lights />
//           <OrbitControls />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }
// function Sun() {
//   const texture = useLoader(THREE.TextureLoader, sunTexture);
//   return (
//     <mesh>
//       <sphereGeometry args={[2.5, 32, 32]} />
//       <meshStandardMaterial map={texture} />
//     </mesh>
//   );
// }
// function Planet({
//   planet: {
//     color,
//     xRadius,
//     zRadius,
//     size,
//     speed,
//     offset,
//     rotationSpeed,
//     textureMap
//   }
// }) {
//   const planetRef = React.useRef();
//   const texture = useLoader(THREE.TextureLoader, textureMap);
//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime() * speed + offset;
//     const x = xRadius * Math.sin(t);
//     const z = zRadius * Math.cos(t);
//     planetRef.current.position.x = x;
//     planetRef.current.position.z = z;
//     planetRef.current.rotation.y += rotationSpeed;
//   });

//   return (
//     <>
//       <mesh ref={planetRef}>
//         <sphereGeometry args={[size, 32, 32]} />
//         <meshStandardMaterial map={texture} />
//       </mesh>
//       <Ecliptic xRadius={xRadius} zRadius={zRadius} />
//     </>
//   );
// }

// function Lights() {
//   return (
//     <>
//       <ambientLight />
//       <pointLight position={[0, 0, 0]} />
//     </>
//   );
// }

// function Ecliptic({ xRadius = 1, zRadius = 1 }) {
//   const points = [];
//   for (let index = 0; index < 64; index++) {
//     const angle = (index / 64) * 2 * Math.PI;
//     const x = xRadius * Math.cos(angle);
//     const z = zRadius * Math.sin(angle);
//     points.push(new THREE.Vector3(x, 0, z));
//   }

//   points.push(points[0]);

//   const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
//   return (
//     <line geometry={lineGeometry}>
//       <lineBasicMaterial attach="material" color="#393e46" linewidth={10} />
//     </line>
//   );
// }


// import React, { Suspense, useEffect, useState } from "react";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import * as THREE from "three";
// import axios from "axios";
// import sunTexture from "../../image/texture/download7.jpeg";
// import "./SolarSystemThree.scss";
// import tx1 from "../../image/texture/download.jpeg";
// import tx2 from "../../image/texture/download2.jpeg";
// import tx3 from "../../image/texture/download3.jpeg";
// import tx4 from "../../image/texture/download4.jpeg";
// import tx5 from "../../image/texture/download5.jpeg";
// import tx6 from "../../image/texture/download6.jpeg";

// export default function SolarSystemThree() {
//   const [planets, setPlanets] = useState([]);

//   useEffect(() => {
//     const getPlanets = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.le-systeme-solaire.net/rest/bodies/`
//         );
//         const planetData = response.data.bodies.filter((body) => body.isPlanet);
//         setPlanets(planetData);
//       } catch (error) {
//         console.error("Error fetching planet data:", error);
//       }
//     };

//     getPlanets();
//   }, []);

//   const random = (a, b) => a + Math.random() * b;
//   const randomInt = (a, b) => Math.floor(random(a, b));
//   const randomColor = () =>
//     `rgb(${randomInt(80, 50)}, ${randomInt(80, 50)}, ${randomInt(80, 50)})`;
//   const shuffle = (a) => {
//     const temp = a.slice(0);
//     for (let i = temp.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [temp[i], temp[j]] = [temp[j], temp[i]];
//     }
//     return temp;
//   };

//   const textures = shuffle([tx1, tx2, tx3, tx4, tx5, tx6]);

//   return (
//     <div className="rooot">
//       <Canvas
//         camera={{ position: [0, 30, 50], fov: 45 }}
//         style={{ bottom: "70px" }}
//       >
//         <Suspense fallback={null}>
//           <Sun />
//           {planets.map((planet, index) => (
//             <Planet
//               key={planet.id}
//               planet={{
//                 color: randomColor(),
//                 xRadius: (index + 2) * 10, // Increased distance between planets
//                 zRadius: (index + 2) * 7, // Adjusted orbit size
//                 size: planet.meanRadius / 3000, // Reduced size for better spacing
//                 speed: random(0.1, 0.4), // Adjusted speed to prevent too fast movement
//                 offset: random(0, Math.PI * 2),
//                 rotationSpeed: random(0.01, 0.03),
//                 textureMap: textures[index] || tx1,
//               }}
//             />
//           ))}
//           <Lights />
//           <OrbitControls />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }

// function Sun() {
//   const texture = useLoader(THREE.TextureLoader, sunTexture);
//   return (
//     <mesh>
//       <sphereGeometry args={[5, 32, 32]} /> {/* Increased the size of the Sun */}
//       <meshStandardMaterial map={texture} />
//     </mesh>
//   );
// }

// function Planet({ planet }) {
//   const {
//     color,
//     xRadius,
//     zRadius,
//     size,
//     speed,
//     offset,
//     rotationSpeed,
//     textureMap,
//   } = planet;

//   const planetRef = React.useRef();
//   const texture = useLoader(THREE.TextureLoader, textureMap);

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime() * speed + offset;
//     const x = xRadius * Math.sin(t);
//     const z = zRadius * Math.cos(t);
//     planetRef.current.position.x = x;
//     planetRef.current.position.z = z;
//     planetRef.current.rotation.y += rotationSpeed;
//   });

//   return (
//     <>
//       <mesh ref={planetRef}>
//         <sphereGeometry args={[size, 32, 32]} />
//         <meshStandardMaterial map={texture} />
//       </mesh>
//       <Ecliptic xRadius={xRadius} zRadius={zRadius} />
//     </>
//   );
// }

// function Lights() {
//   return (
//     <>
//       <ambientLight intensity={0.5} /> {/* Softened the ambient light */}
//       <pointLight position={[0, 0, 0]} intensity={1.5} /> {/* Brightened the point light */}
//     </>
//   );
// }

// function Ecliptic({ xRadius = 1, zRadius = 1 }) {
//   const points = [];
//   for (let index = 0; index < 64; index++) {
//     const angle = (index / 64) * 2 * Math.PI;
//     const x = xRadius * Math.cos(angle);
//     const z = zRadius * Math.sin(angle);
//     points.push(new THREE.Vector3(x, 0, z));
//   }

//   points.push(points[0]);

//   const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
//   return (
//     <line geometry={lineGeometry}>
//       <lineBasicMaterial attach="material" color="#393e46" linewidth={10} />
//     </line>
//   );
// }


// import React, { Suspense, useRef, useEffect } from "react";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import * as THREE from "three";
// import sunTexture from "../../image/texture/download7.jpeg"; // Sun texture
// import worldTexture from "../../image/texture/download5.jpeg"; // World texture
// import asteroidTexture from "../../image/texture/1.png"; // Asteroid texture

// import "./SolarSystemThree.scss";

// export default function SolarSystemThree() {
//   return (
//     <div className="rooot">
//       <Canvas camera={{ position: [0, 15, 30], fov: 45 }}>
//         <Suspense fallback={null}>
//           <Sun />
//           <World />
//           <Asteroids />
//           <Lights />
//           <OrbitControls />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }

// function Sun() {
//   const texture = useLoader(THREE.TextureLoader, sunTexture);
//   return (
//     <mesh position={[0, 0, 0]}>
//       <sphereGeometry args={[5, 32, 32]} />
//       <meshStandardMaterial map={texture} />
//     </mesh>
//   );
// }

// function World() {
//   const texture = useLoader(THREE.TextureLoader, worldTexture);
//   return (
//     <mesh position={[15, 0, 0]}>
//       <sphereGeometry args={[2.5, 32, 32]} />
//       <meshStandardMaterial map={texture} />
//     </mesh>
//   );
// }

// function Asteroids() {
//   const asteroidRefs = useRef([]);
//   const texture = useLoader(THREE.TextureLoader, asteroidTexture);
//   const initialSpeed = 0.2; // Initial speed of asteroids
//   const acceleratedSpeed = 0.4; // Speed after acceleration
//   let speed = initialSpeed;

//   useEffect(() => {
//     // Speed up after 6-7 seconds
//     const timer = setTimeout(() => {
//       speed = acceleratedSpeed;
//     }, 7000);

//     // Cleanup timer on component unmount
//     return () => clearTimeout(timer);
//   }, []);

//   // Initialize asteroid positions
//   useEffect(() => {
//     asteroidRefs.current.forEach((asteroid, index) => {
//       asteroid.position.x = -40 + index * 10; // Start off-screen to the left
//       asteroid.position.z = random(-10, 10); // Random Z position
//     });
//   }, []);

//   useFrame(() => {
//     asteroidRefs.current.forEach((asteroid) => {
//       asteroid.position.x += speed; // Move at current speed
//       asteroid.rotation.y += 0.01; // Rotate asteroid

//       // Reset position when the asteroid moves off the screen
//       if (asteroid.position.x > 50) {
//         asteroid.position.x = -40; // Reset to the left
//         asteroid.position.z = random(-10, 10); // Randomize Z position
//       }
//     });
//   });

//   return (
//     <>
//       {Array.from({ length: 5 }).map((_, index) => (
//         <mesh
//           key={index}
//           ref={(ref) => (asteroidRefs.current[index] = ref)}
//         >
//           {/* Use DodecahedronGeometry for irregular shapes */}
//           <dodecahedronGeometry args={[1, 0]} />
//           <meshStandardMaterial map={texture} />
//         </mesh>
//       ))}
//     </>
//   );
// }

// function Lights() {
//   return (
//     <>
//       <ambientLight />
//       <pointLight position={[0, 0, 0]} />
//     </>
//   );
// }

// // Utility function for randomization
// const random = (a, b) => a + Math.random() * b;


// import React, { Suspense, useRef, useEffect } from "react";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import * as THREE from "three";
// import sunTexture from "../../image/texture/download7.jpeg";
// import "./SolarSystemThree.scss";
// import tx1 from "../../image/texture/download.jpeg";
// import tx2 from "../../image/texture/download2.jpeg";
// import tx3 from "../../image/texture/download3.jpeg";
// import tx4 from "../../image/texture/download4.jpeg";
// import tx5 from "../../image/texture/download5.jpeg";
// import tx6 from "../../image/texture/download6.jpeg";
// import asteroidTexture from "../../image/texture/1.png"; // Asteroid texture

// export default function SolarSystemThree() {
//   const random = (a, b) => a + Math.random() * b;
//   const randomInt = (a, b) => Math.floor(random(a, b));
//   const randomColor = () =>
//     `rgb(${randomInt(80, 50)}, ${randomInt(80, 50)}, ${randomInt(80, 50)})`;
//   const shuffle = (a) => {
//     const temp = a.slice(0);
//     for (let i = temp.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [temp[i], temp[j]] = [temp[j], temp[i]];
//     }
//     return temp;
//   };

//   const textures = shuffle([tx1, tx2, tx3, tx4, tx5, tx6]);

//   const planetData = [];
//   const totalPlanets = 6;
//   for (let index = 0; index < totalPlanets; index++) {
//     planetData.push({
//       id: index,
//       color: randomColor(),
//       xRadius: (index + 1.5) * 4,
//       zRadius: (index + 1.5) * 2,
//       size: random(0.5, 1),
//       speed: random(0.1, 0.6),
//       offset: random(0, Math.PI * 2),
//       rotationSpeed: random(0.01, 0.03),
//       textureMap: textures[index],
//     });
//   }

//   return (
//     <div className="rooot">
//       <Canvas camera={{ position: [0, 20, 25], fov: 45 }} style={{ bottom: "70px" }}>
//         <Suspense fallback={null}>
//           <Sun />
//           {planetData.map((planet) => (
//             <Planet planet={planet} key={planet.id} />
//           ))}
//           <Asteroids />
//           <Lights />
//           <OrbitControls />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }

// function Sun() {
//   const texture = useLoader(THREE.TextureLoader, sunTexture);
//   return (
//     <mesh>
//       <sphereGeometry args={[2.5, 32, 32]} />
//       <meshStandardMaterial map={texture} />
//     </mesh>
//   );
// }

// function Planet({
//   planet: {
//     color,
//     xRadius,
//     zRadius,
//     size,
//     speed,
//     offset,
//     rotationSpeed,
//     textureMap,
//   },
// }) {
//   const planetRef = React.useRef();
//   const texture = useLoader(THREE.TextureLoader, textureMap);
//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime() * speed + offset;
//     const x = xRadius * Math.sin(t);
//     const z = zRadius * Math.cos(t);
//     planetRef.current.position.x = x;
//     planetRef.current.position.z = z;
//     planetRef.current.rotation.y += rotationSpeed;
//   });

//   return (
//     <>
//       <mesh ref={planetRef}>
//         <sphereGeometry args={[size, 32, 32]} />
//         <meshStandardMaterial map={texture} />
//       </mesh>
//       <Ecliptic xRadius={xRadius} zRadius={zRadius} />
//     </>
//   );
// }

// function Asteroids() {
//   const asteroidRefs = useRef([]);
//   const texture = useLoader(THREE.TextureLoader, asteroidTexture);

//   useEffect(() => {
//     asteroidRefs.current.forEach((asteroid, index) => {
//       asteroid.position.x = -60 + index * 15; // Start off-screen with increased distance
//       asteroid.position.z = random(-20, 20); // Random Z position with more spread
//     });
//   }, []);

//   useFrame(() => {
//     asteroidRefs.current.forEach((asteroid) => {
//       asteroid.position.x += 0.1; // Slower movement speed
//       asteroid.rotation.y += 0.01; // Rotate asteroid

//       // Reset position when the asteroid moves off the screen
//       if (asteroid.position.x > 50) {
//         asteroid.position.x = -60; // Reset to the left
//         asteroid.position.z = random(-20, 20); // Randomize Z position
//       }
//     });
//   });

//   return (
//     <>
//       {Array.from({ length: 5 }).map((_, index) => (
//         <mesh
//           key={index}
//           ref={(ref) => (asteroidRefs.current[index] = ref)}
//         >
//           <icosahedronGeometry args={[random(0.3, 0.5), 0]} /> {/* Smaller size */}
//           <meshStandardMaterial map={texture} />
//         </mesh>
//       ))}
//     </>
//   );
// }

// function Lights() {
//   return (
//     <>
//       <ambientLight />
//       <pointLight position={[0, 0, 0]} />
//     </>
//   );
// }

// function Ecliptic({ xRadius = 1, zRadius = 1 }) {
//   const points = [];
//   for (let index = 0; index < 64; index++) {
//     const angle = (index / 64) * 2 * Math.PI;
//     const x = xRadius * Math.cos(angle);
//     const z = zRadius * Math.sin(angle);
//     points.push(new THREE.Vector3(x, 0, z));
//   }

//   points.push(points[0]);

//   const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
//   return (
//     <line geometry={lineGeometry}>
//       <lineBasicMaterial attach="material" color="#393e46" linewidth={10} />
//     </line>
//   );
// }

// // Utility function for randomization
// const random = (a, b) => a + Math.random() * b;



import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import sunTexture from "../../image/texture/download7.jpeg";
import asteroidTexture from "../../image/texture/1.png";
import tx1 from "../../image/texture/download.jpeg";
import tx2 from "../../image/texture/download2.jpeg";
import tx3 from "../../image/texture/download3.jpeg";
import tx4 from "../../image/texture/download4.jpeg";
import tx5 from "../../image/texture/download5.jpeg";
import tx6 from "../../image/texture/download6.jpeg";
import "./SolarSystemThree.scss";

export default function SolarSystemThree() {
  const [asteroidData, setAsteroidData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-09-01&end_date=2024-09-07&api_key=pn2ByUA60ibdKfynTm72cKlUVSHrgst4djyFOoRq`
        );

        const data = await res.json();
        const neos = data.near_earth_objects;
        const asteroids = [];

        for (const date in neos) {
          neos[date].forEach((neo) => {
            if (neo.is_potentially_hazardous_asteroid) {
              asteroids.push(neo);
            }
          });
        }

        setAsteroidData(asteroids.slice(0, 10)); // Limit to 10 for simplicity
      } catch (error) {
        console.error("Error fetching NASA data:", error);
      }
    };

    fetchData();
  }, []);

  const planetData = [
    {
      id: 0,
      color: "rgb(50, 100, 150)",
      xRadius: 5,
      zRadius: 2.5,
      size: 1,
      speed: 0.1,
      offset: 0,
      rotationSpeed: 0.02,
      textureMap: tx1,
    },
    {
      id: 1,
      color: "rgb(120, 80, 50)",
      xRadius: 8,
      zRadius: 4,
      size: 0.9,
      speed: 0.15,
      offset: Math.PI / 4,
      rotationSpeed: 0.01,
      textureMap: tx2,
    },
    {
      id: 2,
      color: "rgb(200, 150, 80)",
      xRadius: 11,
      zRadius: 6,
      size: 1.1,
      speed: 0.07,
      offset: Math.PI / 2,
      rotationSpeed: 0.03,
      textureMap: tx3,
    },
    {
      id: 3,
      color: "rgb(80, 120, 200)",
      xRadius: 14,
      zRadius: 8,
      size: 1.2,
      speed: 0.12,
      offset: Math.PI,
      rotationSpeed: 0.025,
      textureMap: tx4,
    },
    {
      id: 4,
      color: "rgb(100, 80, 150)",
      xRadius: 17,
      zRadius: 10,
      size: 1.3,
      speed: 0.09,
      offset: Math.PI * 1.5,
      rotationSpeed: 0.02,
      textureMap: tx5,
    },
    {
      id: 5,
      color: "rgb(80, 150, 90)",
      xRadius: 20,
      zRadius: 12,
      size: 1.2,
      speed: 0.11,
      offset: Math.PI * 2,
      rotationSpeed: 0.015,
      textureMap: tx6,
    },
  ];

  return (
    <div className="rooot">
      <Canvas camera={{ position: [0, 20, 25], fov: 45 }} style={{ bottom: "70px" }}>
        <Suspense fallback={null}>
          <Sun />
          {planetData.map((planet) => (
            <Planet planet={planet} key={planet.id} />
          ))}
          <Asteroids asteroids={asteroidData} />
          <Lights />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Sun() {
  const texture = useLoader(THREE.TextureLoader, sunTexture);
  return (
    <mesh>
      <sphereGeometry args={[1.9, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function Planet({
  planet: { xRadius, zRadius, size, speed, offset, rotationSpeed, textureMap },
}) {
  const planetRef = React.useRef();
  const texture = useLoader(THREE.TextureLoader, textureMap);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    const x = xRadius * Math.sin(t);
    const z = zRadius * Math.cos(t);
    planetRef.current.position.set(x, 0, z);
    planetRef.current.rotation.y += rotationSpeed;
  });

  return (
    <>
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <Ecliptic xRadius={xRadius} zRadius={zRadius} />
    </>
  );
}

function Asteroids({ asteroids }) {
  const asteroidRefs = useRef([]);
  const texture = useLoader(THREE.TextureLoader, asteroidTexture);

  useEffect(() => {
    asteroidRefs.current.forEach((asteroid, index) => {
      asteroid.position.x = -100 + index * 10;
      asteroid.position.z = random(-40, 40);
      asteroid.position.y = random(-10, 10);
    });
  }, [asteroids]);

  useFrame(() => {
    asteroidRefs.current.forEach((asteroid) => {
      asteroid.position.x += 0.05; // Slower movement
      asteroid.rotation.y += 0.01;

      if (asteroid.position.x > 50) {
        asteroid.position.x = -100;
        asteroid.position.z = random(-40, 40);
        asteroid.position.y = random(-10, 10);
      }
    });
  });

  return (
    <>
      {asteroids.map((asteroid, index) => (
        <mesh
          key={asteroid.id}
          ref={(ref) => (asteroidRefs.current[index] = ref)}
        >
          <icosahedronGeometry args={[random(0.6, 0.8), 0]} />
          <meshStandardMaterial map={texture} />
        </mesh>
      ))}
    </>
  );
}

function Lights() {
  return (
    <>
      <ambientLight />
      <pointLight position={[0, 0, 0]} />
    </>
  );
}

function Ecliptic({ xRadius = 1, zRadius = 1 }) {
  const points = [];
  for (let index = 0; index < 64; index++) {
    const angle = (index / 64) * 2 * Math.PI;
    const x = xRadius * Math.cos(angle);
    const z = zRadius * Math.sin(angle);
    points.push(new THREE.Vector3(x, 0, z));
  }

  points.push(points[0]);

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color="#393e46" linewidth={10} />
    </line>
  );
}

// Utility functions
const random = (a, b) => a + Math.random() * b;
