import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const SportsCar3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // White background

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(15, 8, 15);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1.2);
    spotLight.position.set(10, 20, 10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // Car materials
    const carPaintMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff0000, // Red color
      metalness: 0.7,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const tireMaterial = new THREE.MeshPhongMaterial({
      color: 0x222222, // Dark color for tires
    });

    const rimMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, // Chrome rims
      metalness: 1.0,
      roughness: 0.2,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x000000,
      metalness: 0,
      roughness: 0,
      transmission: 1,
      transparent: true,
    });

    // Car body
    const carBody = new THREE.Group();

    // Main body
    const bodyGeometry = new THREE.BoxGeometry(8, 2, 4);
    const bodyMesh = new THREE.Mesh(bodyGeometry, carPaintMaterial);
    bodyMesh.castShadow = true;
    carBody.add(bodyMesh);

    // Cockpit
    const cockpitGeometry = new THREE.BoxGeometry(3, 1.5, 3);
    const cockpitMesh = new THREE.Mesh(cockpitGeometry, glassMaterial);
    cockpitMesh.position.set(1, 2, 0);
    carBody.add(cockpitMesh);

    // Rear wing
    const wingGeometry = new THREE.BoxGeometry(1, 0.2, 5);
    const wingMesh = new THREE.Mesh(wingGeometry, carPaintMaterial);
    wingMesh.position.set(-3.5, 2.5, 0);
    carBody.add(wingMesh);

    // Wheels
    const createWheel = (x, z) => {
      const wheelGroup = new THREE.Group();

      // Tire
      const tireGeometry = new THREE.CylinderGeometry(1, 1, 0.6, 32);
      const tireMesh = new THREE.Mesh(tireGeometry, tireMaterial);
      tireMesh.rotation.z = Math.PI / 2;
      wheelGroup.add(tireMesh);

      // Rim
      const rimGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.65, 16);
      const rimMesh = new THREE.Mesh(rimGeometry, rimMaterial);
      rimMesh.rotation.z = Math.PI / 2;
      wheelGroup.add(rimMesh);

      wheelGroup.position.set(x, 0.6, z);
      return wheelGroup;
    };

    // Add wheels
    carBody.add(createWheel(-3, 2));
    carBody.add(createWheel(-3, -2));
    carBody.add(createWheel(3, 2));
    carBody.add(createWheel(3, -2));

    scene.add(carBody);

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshPhongMaterial({
      color: 0xeeeeee,
      side: THREE.DoubleSide,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    ground.receiveShadow = true;
    scene.add(ground);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default SportsCar3D;
