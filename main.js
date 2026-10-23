import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";

// Scene and Camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Fully wrapped image on sphere
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./bg_0.jpg");
texture.colorSpace = "srgb";
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set(repeat, repeat);
// texture.encoding = THREE.sRGBEncoding;
const sphereGeometry = new THREE.SphereGeometry(15, 60, 92);
const sphereMaterial = new THREE.MeshBasicMaterial({
  map: texture,
});
//const material2 = new THREE.MeshMatcapMaterial

const sphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
const sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere2.position.x = 50;
scene.add(sphere1);
scene.add(sphere2);

const points = [sphere1.position, sphere2.position];
//const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
const lineGeo = new LineGeometry();
lineGeo.setFromPoints(points);
const lineMaterial = new LineMaterial({
  color: 0x0000000,
  linewidth: 15,
});
lineMaterial.resolution.set(window.innerWidth, window.innerHeight);
const line = new Line2(lineGeo, lineMaterial);
scene.add(line);

renderer.setAnimationLoop(animate);

const controls = new OrbitControls(camera, renderer.domElement);
// controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 20, 100);
controls.update();

function animate() {
  requestAnimationFrame(animate);

  const positionAttribute = line.geometry.attributes.position;
  positionAttribute.setXYZ(
    0,
    sphere1.position.x,
    sphere1.position.y,
    sphere1.position.z,
  );
  positionAttribute.setXYZ(
    1,
    sphere2.position.x,
    sphere2.position.y,
    sphere2.position.z,
  );
  positionAttribute.needsUpdate = true;
  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();
  renderer.render(scene, camera);
}

// Image not wrapped onto sphere
// const sphereGeo = new THREE.SphereGeometry(5, 32, 32);
// const sphereMat = new THREE.MeshBasicMaterial({ color: 0x333333 });
// const sphere = new THREE.Mesh(sphereGeo, sphereMat);
// scene.add(sphere);

// // 2. Create the picture plane
// const imageGeo = new THREE.PlaneGeometry(8, 8); // Dimensions of the picture
// const texture = new THREE.TextureLoader().load("./profPic.jpg");
// const imageMat = new THREE.MeshBasicMaterial({
//   map: texture,
//   transparent: false,
//   side: THREE.FrontSide,
// });
// const imageMesh = new THREE.Mesh(imageGeo, imageMat);
// imageMesh.position.set(0, 0, 5.0);

// // 4. Attach it to the sphere so it rotates with it
// sphere.add(imageMesh);
