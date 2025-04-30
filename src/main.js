import * as THREE from '../node_modules/three/build/three.module.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
      
      // Scene
      const scene = new THREE.Scene();
      
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight*1.5, 0.1, 1000);
     
      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      const controls = new OrbitControls( camera, renderer.domElement );
      renderer.setSize(window.innerWidth, window.innerHeight/1.5);
      renderer.setClearColor(0x1D1D1D); // background color
      document.body.appendChild(renderer.domElement);

      // Camera
      camera.position.set(7, 3, 7);
      camera.lookAt(0, 0, 7);
      controls.update();
      const loader = new THREE.TextureLoader();
      const texture = loader.load( '../image.png' );
      texture.colorSpace = THREE.SRGBColorSpace;

      //gltf 3d obj loader
     const gltfLoader = new GLTFLoader();
     let model;    

     gltfLoader.load('../Intergalactic_Spaceships_Version_2.gltf', function(gltf) {
     model = gltf.scene;
     gltf.scene.position.set(0,0,0);
     scene.add(gltf.scene);
     }, 
     undefined, function(error) {
        console.error(error);
     });

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffAA37); // Soft ambient light
      const pointLight = new THREE.PointLight(0xffffff,80,50);
      pointLight.position.set(3,4,0);
      scene.add(ambientLight, pointLight);

      // Animation loop
      function animate() {
        requestAnimationFrame(animate);
        //spin ship 
        if(model){model.rotation.y -= 0.002;}

        controls.update();
        renderer.render(scene, camera);
      }

      animate();

      // Handle resizing
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight/1.5);
      });

