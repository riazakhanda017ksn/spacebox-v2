import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const EarthScene = () => {
  const canvasRef = useRef();

  useEffect(() => {
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    renderer.domElement.id = 'canvas-earth';
    canvasRef.current.appendChild(renderer.domElement);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      63,
      window.innerWidth / window.innerHeight,
      1,
      8000
    );
    camera.position.set(0, 0, 150);

    // Scene setup
    const scene = new THREE.Scene();

    // Lights setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Skybox setup
    const skyBoxLoader = new THREE.CubeTextureLoader();
    const skyBoxTexture = skyBoxLoader.load([
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/px.jpg',
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/nx.jpg',
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/py.jpg',
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/ny.jpg',
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/pz.jpg',
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/nz.jpg',
    ]);
    scene.background = skyBoxTexture;

    // Earth setup
    const earthGeometry = new THREE.SphereGeometry(50, 64, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/earthmap1k.jpg'),
      bumpMap: new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/earthbump1k.jpg'),
      bumpScale: 0.05,
      specularMap: new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/earthspec1k.jpg'),
      specular: new THREE.Color('grey'),
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earthMesh);

    // Clouds setup
    const cloudGeometry = new THREE.SphereGeometry(50.3, 64, 32);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/earth_clouds_1024x512.jpg'),
      transparent: true,
      opacity: 0.8,
    });
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(cloudMesh);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the earth and clouds
      earthMesh.rotation.y += 0.001;
      cloudMesh.rotation.y += 0.0012;

      // Render the scene
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={canvasRef} />;
};

export default EarthScene;
