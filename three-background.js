// Three.js animated background (integrated from interactive-background.html)
(function () {
  const container = document.getElementById('three-bg');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const isMobile = window.innerWidth < 768;
  const pointCloudCount = isMobile ? 3000 : (window.innerWidth > 1400 ? 10000 : 6000);

  const pointGeometry = new THREE.BufferGeometry();
  const pointPositions = new Float32Array(pointCloudCount * 3);
  const pointColors = new Float32Array(pointCloudCount * 3);

  for (let i = 0; i < pointCloudCount; i++) {
    const i3 = i * 3;
    pointPositions[i3] = (Math.random() - 0.5) * 2000;
    pointPositions[i3 + 1] = (Math.random() - 0.5) * 2000;
    pointPositions[i3 + 2] = (Math.random() - 0.5) * 2000;

    const c = Math.random();
    pointColors[i3] = c;
    pointColors[i3 + 1] = c * 0.5;
    pointColors[i3 + 2] = 1.0 - c;
  }

  pointGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
  pointGeometry.setAttribute('color', new THREE.BufferAttribute(pointColors, 3));

  const pointMaterial = new THREE.PointsMaterial({ size: 1.5, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true });
  const pointCloud = new THREE.Points(pointGeometry, pointMaterial);
  scene.add(pointCloud);

  // A few minimal meshes for depth (reduced for performance)
  const shipMat = new THREE.MeshStandardMaterial({ color: 0x3333ff, emissive: 0x1111ff, metalness: 0.8, roughness: 0.2 });
  const shipGeom = new THREE.CylinderGeometry(2, 6, 24, 20);
  const ships = [];
  const shipCount = isMobile ? 3 : 6;
  for (let i = 0; i < shipCount; i++) {
    const mesh = new THREE.Mesh(shipGeom, shipMat);
    mesh.position.set((Math.random() - 0.5) * 1000, (Math.random() - 0.5) * 500, (Math.random() - 0.5) * 1000);
    mesh.rotation.z = Math.PI / 2;
    mesh.scale.set(0.5, 0.5, 0.5);
    scene.add(mesh);
    ships.push(mesh);
  }

  const ambientLight = new THREE.AmbientLight(0x404040, 2.0);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 2.0, 1500);
  pointLight.position.set(100, 500, 100);
  scene.add(pointLight);

  camera.position.set(0, 300, 1200);
  camera.lookAt(0, 0, 0);

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animate() {
    requestAnimationFrame(animate);
    if (!reduceMotion) {
      pointCloud.rotation.y += 0.00035;
      ships.forEach((s, i) => {
        s.position.x += Math.sin(Date.now() * 0.0005 + i) * 0.4;
        s.position.z += Math.cos(Date.now() * 0.0005 + i) * 0.4;
        s.rotation.y += 0.01;
      });
    }
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();


