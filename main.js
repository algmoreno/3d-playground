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
renderer.setAnimationLoop(animate);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
// controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 20, 100);
controls.update();

// Fully wrapped image on sphere
// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load("./bg_0.jpg");
// texture.colorSpace = "srgb";
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set(repeat, repeat);
// texture.encoding = THREE.sRGBEncoding;

// Sphere
const sphereGeometry = new THREE.SphereGeometry(15, 30, 62);
const sphereMaterial = new THREE.MeshMatcapMaterial({
  // map: texture,
  wireframe: true,
  color: 0xafdafdafd,
});
//const material2 = new THREE.MeshMatcapMaterial

const sphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
const sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial);
const sphere3 = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere2.position.x = 50;
sphere3.position.x = 25;
sphere3.position.y = -50;
scene.add(sphere1);
scene.add(sphere2);
scene.add(sphere3);

const xMidpoint = (sphere1.position.x + sphere2.position.x) / 2;
// const midpointVector = sphere1.position;
const midpointVector = new THREE.Vector3(
  xMidpoint,
  sphere1.position.y,
  sphere1.position.z,
);

// Lines
const pointSet1 = [sphere1.position, sphere2.position];
const pointSet2 = [midpointVector, sphere3.position];
const parentLineGeo = new LineGeometry();
const childLineGeo = new LineGeometry();
parentLineGeo.setFromPoints(pointSet1);
childLineGeo.setFromPoints(pointSet2);
const lineMaterial = new LineMaterial({
  color: 0x0000000,
  linewidth: 10,
});
lineMaterial.resolution.set(window.innerWidth, window.innerHeight);
const parentLine = new Line2(parentLineGeo, lineMaterial);
const childLine = new Line2(childLineGeo, lineMaterial);
scene.add(parentLine, childLine);

function animate() {
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
