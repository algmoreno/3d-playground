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
const sphereGeometry = new THREE.SphereGeometry(15, 25, 40);
const sphereMaterial = new THREE.MeshMatcapMaterial({
  // map: texture,
  wireframe: true,
  color: 0xafdafdafd,
});
//const material2 = new THREE.MeshMatcapMaterial

// Objects
const parent1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
const parent2 = new THREE.Mesh(sphereGeometry, sphereMaterial);
const child1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
const child2 = new THREE.Mesh(sphereGeometry, sphereMaterial);
const child3 = new THREE.Mesh(sphereGeometry, sphereMaterial);

// Positioning
const childrenYPos = -50;
const parentY = 0;
parent1.position.x = -25
parent2.position.x = parent1.position.x + 50;
const parentMidpointX = (parent1.position.x + parent2.position.x) / 2;

child1.position.x = parentMidpointX - 75;
child1.position.y = childrenYPos;
child2.position.x = parentMidpointX;
child2.position.y = childrenYPos;
child3.position.x = parentMidpointX + 75;
child3.position.y = childrenYPos;

// Points for creating lines
const parentMidpoint = new THREE.Vector3(
  parentMidpointX,
);

// one point for each child
// childrenMiddleJoint is pretty constant
// the other joints and children positionings will depend on 
// the number of children/siblings and then partner status
// sibling order is also important - always oldest to youngest from left to right
// with odd number of siblings there will be a child at the parent middle point
// with even number siblings children will essentially line up with parents x position
const childrenMiddleJoint = new THREE.Vector3(
  parentMidpointX,
  parentY + (childrenYPos/2),
)

const childrenEndJointL = new THREE.Vector3(
  parentMidpointX - 75,
  parentY + (childrenYPos/2),
)

const childrenEndJointR = new THREE.Vector3(
  parentMidpointX + 75,
  parentY + (childrenYPos/2),
)

// Point sets - starting points for lines
const pointSet1 = [parent1.position, parent2.position];
const pointSet2 = [parentMidpoint, childrenMiddleJoint];
const pointSet3 = [childrenEndJointL, childrenMiddleJoint];
const pointSet4 = [childrenMiddleJoint, childrenEndJointR];
const pointSet5 = [childrenEndJointL, child1.position];
const pointSet6 = [childrenMiddleJoint, child2.position];
const pointSet7 = [childrenEndJointR, child3.position];

// Lines
const lineMaterial = new LineMaterial({
  color: 0x0000000,
  linewidth: 5,
});
lineMaterial.resolution.set(window.innerWidth, window.innerHeight);

// Line Geometry
const parentLineGeo = new LineGeometry();
const parentToChildrenGeo = new LineGeometry();
const childrenEndLToMiddleGeo = new LineGeometry();
const childrenMiddleJointToEndRGeo = new LineGeometry();
const childrenLineToChild1Geo = new LineGeometry();
const childrenLineToChild2Geo = new LineGeometry();
const childrenLineToChild3Geo = new LineGeometry();

parentLineGeo.setFromPoints(pointSet1);
parentToChildrenGeo.setFromPoints(pointSet2);
childrenEndLToMiddleGeo.setFromPoints(pointSet3);
childrenMiddleJointToEndRGeo.setFromPoints(pointSet4);
childrenLineToChild1Geo.setFromPoints(pointSet5);
childrenLineToChild2Geo.setFromPoints(pointSet6);
childrenLineToChild3Geo.setFromPoints(pointSet7);

// Lines
const parentLine = new Line2(parentLineGeo, lineMaterial);
const parentToChildrenLine = new Line2(parentToChildrenGeo, lineMaterial);
const childrenLineL = new Line2(childrenEndLToMiddleGeo, lineMaterial);
const childrenLineR = new Line2(childrenMiddleJointToEndRGeo, lineMaterial);
const childrenLineLToChild1Line = new Line2(childrenLineToChild1Geo, lineMaterial);
const childrenLineLToChild2Line = new Line2(childrenLineToChild2Geo, lineMaterial);
const childrenLineLToChild3Line = new Line2(childrenLineToChild3Geo, lineMaterial);

scene.add(parent1, parent2, child1, child2, child3, parentLine, 
  parentToChildrenLine, childrenLineL, childrenLineR, childrenLineLToChild1Line, 
  childrenLineLToChild2Line, childrenLineLToChild3Line);

// Animate
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
