

// // src/components/Orrery.js
// import React, { useState, useEffect, useRef } from 'react';
// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { OrbitControls, Stars } from '@react-three/drei';
// import TWEEN from '@tweenjs/tween.js';
// import { fetchNearEarthObjects } from '../nasaService';


// // CelestialBody component remains the same
// const CelestialBody = ({ size, position, color, onClick }) => (
//   <mesh position={position} onClick={onClick}>
//     <sphereGeometry args={[size, 100, 100]} />
//     <meshStandardMaterial color={color} />
//   </mesh>
// );

// // New component to handle camera movement
// const CameraController = ({ selectedObject }) => {
//   const { camera } = useThree();
//   const orbitRef = useRef();

//   useEffect(() => {
//     if (selectedObject) {
//       const { x, y, z } = selectedObject.position;
//       new TWEEN.Tween(camera.position)
//         .to({ x: x * 1.2, y: y * 1.2, z: z * 1.2 }, 1000)
//         .easing(TWEEN.Easing.Cubic.Out)
//         .onUpdate(() => {
//           camera.lookAt(x, y, z);
//           orbitRef.current.target.set(x, y, z);
//         })
//         .start();
//     }
//   }, [selectedObject, camera]);

//   useFrame(() => {
//     TWEEN.update();
//   });

//   return <OrbitControls ref={orbitRef} />;
// };

// const Orrery = () => {
//   const [bodies, setBodies] = useState([]);
//   const [selectedObject, setSelectedObject] = useState(null);

//   useEffect(() => {
//     // Fetch Near-Earth Objects from NASA API
//     fetchNearEarthObjects().then(setBodies);
//   }, []);

//   const handleClick = (event, object) => {
//     setSelectedObject(object);
//   };

//   return (
//     <Canvas>
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} />
//       <Stars />
//       <CameraController selectedObject={selectedObject} />
//       {bodies.map((body, index) => (
//         <CelestialBody
//           key={body.id}
//           size={body.estimated_diameter.kilometers.estimated_diameter_min / 100}
//           position={[index * 5, 0, 0]}
//           color="red"
//           onClick={(event) => handleClick(event, event.object)}
//         />
//       ))}
//     </Canvas>
//   );
// };

// export default Orrery;


// src/Help.js
import React from 'react';

const Help = () => {
  const styles = {
    help: {
      display: 'none', // Must be hidden in CodePen's image preview
      position: 'absolute',
      bottom: '30px',
      left: '30px',
      padding: '20px 30px',
      color: '#e7f0f6',
      background: 'rgba(41, 41, 41, 0.6)',
    },
    title: {
      margin: '0 0 10px 0',
      fontSize: '18px',
      fontWeight: 300,
    },
    paragraph: {
      margin: '10px 0 0 0',
      color: '#97979c',
      fontSize: '14px',
    },
    link: {
      display: 'inline-block',
      margin: '0',
      padding: '6px 10px',
      color: '#fff',
      fontSize: '14px',
      background: '#337578',
      textDecoration: 'none',
    },
    hr: {
      display: 'block',
      height: '1px',
      border: '0',
      borderTop: '1px solid #337578',
      margin: '1em 0',
      padding: '0',
    },
    right: {
      textAlign: 'right',
    },
  };

  return (
    <div style={styles.help}>
      <h1 style={styles.title}>CONTROLS (OrbitControls.js)</h1>
      <p style={styles.paragraph}>Orbit - left mouse / touch: one finger move</p>
      <p style={styles.paragraph}>Zoom - middle mouse, or mousewheel / touch: two finger spread or squish</p>
      <p style={styles.paragraph}>Pan - right mouse, or arrow keys / touch: three finger swipe</p>
      <hr style={styles.hr} />
      <p style={styles.paragraph}>With controls panel, you can change more than 70 parameters.</p>
      <p style={styles.paragraph}>Find all my resources in head of js file: Gist, textures, examples, etc :)</p>
      <p style={styles.right}>
        <a href="https://twitter.com/jprivet_dev" target="_blank" rel="noopener noreferrer" style={styles.link}>
          @jprivet_dev
        </a>
      </p>
    
    </div>
  );
};

export default Help;
