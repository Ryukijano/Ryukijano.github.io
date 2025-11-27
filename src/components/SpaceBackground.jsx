import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SpaceBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    // Add a slight fog to blend distant objects
    scene.fog = new THREE.FogExp2(0x000000, 0.0005);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimization
    containerRef.current.appendChild(renderer.domElement);

    // Particle system for the base background (stars or particles)
    const pointCloudCount = 8000; // Reduced slightly for performance
    const pointGeometry = new THREE.BufferGeometry();
    const pointPositions = new Float32Array(pointCloudCount * 3);
    const pointColors = new Float32Array(pointCloudCount * 3);

    for (let i = 0; i < pointCloudCount; i++) {
      const i3 = i * 3;
      pointPositions[i3] = (Math.random() - 0.5) * 2000;
      pointPositions[i3 + 1] = (Math.random() - 0.5) * 2000;
      pointPositions[i3 + 2] = (Math.random() - 0.5) * 2000;

      const colorValue = Math.random();
      pointColors[i3] = colorValue;
      pointColors[i3 + 1] = colorValue * 0.5;
      pointColors[i3 + 2] = 1.0 - colorValue;
    }

    pointGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
    pointGeometry.setAttribute('color', new THREE.BufferAttribute(pointColors, 3));

    const pointMaterial = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    const pointCloud = new THREE.Points(pointGeometry, pointMaterial);
    scene.add(pointCloud);

    // Detailed Spaceships
    const spaceshipGeometry = new THREE.CylinderGeometry(3, 10, 40, 32);
    const spaceshipMaterial = new THREE.MeshStandardMaterial({
      color: 0x3333ff,
      emissive: 0x1111ff,
      metalness: 0.9,
      roughness: 0.1
    });
    const detailWingGeometry = new THREE.BoxGeometry(20, 2, 5);
    const spaceships = [];
    const flames = []; // Track flames to animate if needed, or just keep ref
    
    // Create a group to hold all spaceship parts for easier cleanup
    const spaceshipGroup = new THREE.Group();
    scene.add(spaceshipGroup);

    for (let i = 0; i < 10; i++) {
      const spaceship = new THREE.Mesh(spaceshipGeometry, spaceshipMaterial);
      spaceship.position.set(
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 1000
      );
      spaceship.rotation.z = Math.PI / 2;
      spaceship.scale.set(0.5, 0.5, 0.5);

      // Adding wings to the spaceship
      const wing1 = new THREE.Mesh(detailWingGeometry, spaceshipMaterial);
      wing1.position.set(0, -10, 10);
      spaceship.add(wing1);

      const wing2 = new THREE.Mesh(detailWingGeometry, spaceshipMaterial);
      wing2.position.set(0, -10, -10);
      spaceship.add(wing2);

      // Exhaust Flames
      const flameGeometry = new THREE.ConeGeometry(3, 15, 16);
      const flameMaterial = new THREE.MeshBasicMaterial({ color: 0xff4500 });
      const flame = new THREE.Mesh(flameGeometry, flameMaterial);
      flame.position.set(-20, 0, 0);
      flame.rotation.z = Math.PI / 2; // Align with ship
      spaceship.add(flame);
      flames.push(flame);

      spaceships.push(spaceship);
      spaceshipGroup.add(spaceship);
    }

    // Detailed Planets and Satellites
    const textureLoader = new THREE.TextureLoader();
    // Using simple colors/standard materials if textures fail or for style consistency with current design
    // but attempting to load textures as per original code
    const planetTextures = [
      // Fallback or real URLs. Using placeholder colors if textures take time
       null, null, null
    ];
    
    // We'll use colors as fallback/base
    const planetColors = [0x2233ff, 0xaaaaaa, 0xff3322];

    const planetGeometry = new THREE.SphereGeometry(80, 32, 32); // Reduced poly count
    const planets = [];
    const satellites = [];
    
    const planetGroup = new THREE.Group();
    scene.add(planetGroup);

    for (let i = 0; i < 3; i++) {
      const planetMaterial = new THREE.MeshStandardMaterial({
        color: planetColors[i],
        metalness: 0.3,
        roughness: 0.7,
        // map: planetTextures[i] // Commented out to avoid CORS/Loading issues, can re-enable if assets exist
      });
      
      // Try to load texture asynchronously
      if (i === 0) {
         textureLoader.load('https://threejs.org/examples/textures/earth.jpg', (tex) => {
             planetMaterial.map = tex;
             planetMaterial.needsUpdate = true;
         });
      } else if (i === 1) {
        textureLoader.load('https://threejs.org/examples/textures/moon.jpg', (tex) => {
            planetMaterial.map = tex;
            planetMaterial.needsUpdate = true;
        });
      } else if (i === 2) {
         textureLoader.load('https://threejs.org/examples/textures/mars.jpg', (tex) => {
             planetMaterial.map = tex;
             planetMaterial.needsUpdate = true;
         });
      }


      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      planet.position.set(
        (Math.random() - 0.5) * 1500,
        (Math.random() - 0.5) * 800,
        (Math.random() - 0.5) * 1500
      );
      planets.push(planet);
      planetGroup.add(planet);

      // Satellite
      const satelliteGeometry = new THREE.BoxGeometry(10, 10, 20);
      const satelliteMaterial = new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        metalness: 0.8,
        roughness: 0.4
      });
      const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
      // Initial pos relative to planet, will be updated in animate
      satellite.position.set(150, 0, 0); 
      // Add satellite to scene or group? 
      // The original code added to scene and updated pos based on planet pos.
      // Let's add to scene to match logic
      scene.add(satellite); 
      satellites.push(satellite);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2.0);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 3.0, 1500);
    pointLight.position.set(100, 500, 100);
    scene.add(pointLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1.5, 1500, Math.PI / 6, 0.5, 2);
    spotLight.position.set(-200, 600, 200);
    scene.add(spotLight);

    // Camera
    camera.position.set(0, 500, 1500);
    camera.lookAt(0, 100, 0);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate Point Cloud
      pointCloud.rotation.y += 0.0003;

      // Move Spaceships
      spaceships.forEach((spaceship, index) => {
        spaceship.position.x += Math.sin(Date.now() * 0.0005 + index) * 0.5;
        spaceship.position.z += Math.cos(Date.now() * 0.0005 + index) * 0.5;
        spaceship.rotation.y += 0.01;
        
        // Flicker flames
        const flame = spaceship.children.find(c => c.geometry.type === 'ConeGeometry');
        if (flame) {
            flame.scale.set(1, 1 + Math.random() * 0.2, 1);
        }
      });

      // Rotate Planets
      planets.forEach(planet => {
        planet.rotation.y += 0.001;
      });

      // Orbit Satellites
      satellites.forEach((satellite, index) => {
        const planet = planets[index % planets.length];
        // Orbit logic
        const time = Date.now() * 0.0005;
        const offset = index * 2; // distinct orbits
        satellite.position.x = planet.position.x + Math.cos(time + offset) * 150;
        satellite.position.z = planet.position.z + Math.sin(time + offset) * 150;
        satellite.rotation.y += 0.01;
        // Make satellite look at planet
        satellite.lookAt(planet.position);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      pointGeometry.dispose();
      pointMaterial.dispose();
      spaceshipGeometry.dispose();
      spaceshipMaterial.dispose();
      detailWingGeometry.dispose();
      planetGeometry.dispose();
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full -z-10 bg-black"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default SpaceBackground;

