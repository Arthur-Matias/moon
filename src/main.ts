import './style.css';
import * as THREE from 'three';
import tex from './assets/Moon Textures/Moon_Diff.png';
import texDisplacement from './assets/Moon Textures/Moon_Disp.png';
import SkyBox from './SkyBox';

let scene: THREE.Scene
let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
let moon: THREE.Mesh;

let directionalLight: THREE.DirectionalLight

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2()

let skyBox: SkyBox

let angle = 0;

function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth/window.innerHeight, 
    45, 
    30000
  );

  // ---- RENDERER ----

  renderer = new THREE.WebGLRenderer({antialias: true})
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = "three-canvas"
  document.body.appendChild(renderer.domElement);

  
  // ---- CAMERA ----

  camera.position.set(1200, -250, 100);
  camera.lookAt(new THREE.Vector3(0,0,0));
  

  // ---- LIGHTS ----

  let ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
  directionalLight = new THREE.DirectionalLight(0xffffff, 1);

  // // ---- 3D CUBE ----

  const texture = new THREE.TextureLoader().load(tex);
  const geometry = new THREE.SphereGeometry( 500, 300, 300);
  const material = new THREE.MeshStandardMaterial({map: texture})
  material.displacementMap = new THREE.TextureLoader().load(texDisplacement)
  // const dispMat = new THREE.({map: texture})
  

  moon = new THREE.Mesh(geometry, material);
  skyBox = new SkyBox();
  // scene.add( ambientLight );
  scene.add( camera );
  scene.add( directionalLight );
  scene.add( ambientLight );
  scene.add( skyBox.mesh );
  scene.add( moon );
  render();
}

function render(){
  // skyBox.mesh.rotation.x += 0.005;
  // skyBox.mesh.rotation.y += 0.001;
  // camera.rotateX(0.001)
  directionalLight.position.x = mouse.x
  // directionalLight.position
  // directionalLight.position.y = mouse.y
  // directionalLight.position.z = mouse.y
  camera.position.set(1200 , -250, 200 * Math.cos(angle));
  console.log(camera.position.sub(new THREE.Vector3(0,0,0)))
  camera.lookAt(new THREE.Vector3(0,0,0));
  renderer.render( scene, camera )
  angle+=0.01
  requestAnimationFrame(render)
}

window.onload = ()=>{
  init();
}

document.addEventListener('mousemove', onDocumentMouseMove, false);
window.addEventListener('resize', onWindowResize, false);
document.addEventListener('mousedown', onMouseDown, false);

function onDocumentMouseMove(e: MouseEvent) {
    e.preventDefault();
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseDown(event:MouseEvent){
   console.log("mouse position: (" + mouse.x + ", "+ mouse.y + ")");
}

window.onresize = onWindowResize;