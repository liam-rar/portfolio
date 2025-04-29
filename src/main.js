import * as THREE from '../node_modules/three/build/three.module.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
      
      // Scene
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
     
      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      const controls = new OrbitControls( camera, renderer.domElement );
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xffffff); // white background
      document.body.appendChild(renderer.domElement);

      // Camera
      camera.position.set(3, 3, 5);
      camera.lookAt(0, 1, 0);
      controls.update();
      const loader = new THREE.TextureLoader();
      const texture = loader.load( '../image.png' );
      texture.colorSpace = THREE.SRGBColorSpace;

      //gltf 3d obj loader
     const gltfLoader = new GLTFLoader();

     gltfLoader.load('../Intergalactic_Spaceships_Version_2.gltf', function(gltf) {
     scene.add(gltf.scene);
     }, 
     undefined, function(error) {
        console.error(error);
     });

      // Sphere geometry
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshStandardMaterial({map: texture});
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.y = 1; // Raise it above the ground
      scene.add(sphere);

      // Ground plane
      const planeGeometry = new THREE.PlaneGeometry(20, 20);
      const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -Math.PI / 2; // Rotate to be horizontal
      scene.add(plane);

      // Lights
      const ambientLight = new THREE.AmbientLight(0x404040); // Soft ambient light
      const pointLight = new THREE.PointLight(0xffffff, 20, 10);
      pointLight.position.set(2,2.5,0);
      scene.add(ambientLight, pointLight);

      // Animation loop
      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }

      animate();

      // Handle resizing
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

