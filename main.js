import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(15, 16, 32);
const material = new THREE.MeshBasicMaterial({
  color: 0xafdafdafd,
  wireframe: true,
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
scene.background = new THREE.Color(0xffffff);

camera.position.z = 5;

renderer.setAnimationLoop(animate);

const controls = new OrbitControls(camera, renderer.domElement);
// controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 20, 100);
controls.update();

function animate() {
  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();
  renderer.render(scene, camera);
}
