



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
import tx6 from "../../image/texture/neptune.jpg";
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
      textureMap: tx3,
    },
    {
      id: 1,
      color: "rgb(120, 80, 50)",
      xRadius: 8,
      zRadius: 4,
      size: 1.1,
      speed: 0.15,
      offset: Math.PI / 4,
      rotationSpeed: 0.01,
      textureMap: tx4,
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
      textureMap: tx5,
    },
    {
      id: 3,
      color: "rgb(100, 80, 150)",
      xRadius: 17,
      zRadius: 10,
      size: 1.3,
      speed: 0.09,
      offset: Math.PI * 1.5,
      rotationSpeed: 0.02,
      textureMap: tx1,
    },
    {
      id: 4,
      color: "rgb(80, 120, 200)",
      xRadius: 14,
      zRadius: 8,
      size: 1.2,
      speed: 0.12,
      offset: Math.PI,
      rotationSpeed: 0.025,
      textureMap: tx2,
    },
    
    {
      id: 5,
      color: "rgb(80, 150, 90)",
      xRadius: 20,
      zRadius: 12,
      size: 1.3,
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
