import * as THREE from "https://unpkg.com/three@0.158.0/build/three.module.js";

import { OrbitControls } from "https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js";

import { GLTFLoader } from "https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js";

let ring;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
45,
window.innerWidth / window.innerHeight,
0.1,
1000
);

camera.position.set(0,1.5,4);

const renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

controls.enableDamping = true;

const light = new THREE.HemisphereLight(
0xffffff,
0x444444,
1.5
);

scene.add(light);

const loader = new GLTFLoader();

loader.load(

"./AB.glb",

function(gltf){

ring = gltf.scene;

ring.traverse(function(node){

if(node.isMesh){

node.material.metalness = 1;
node.material.roughness = 0.25;

}

});

scene.add(ring);

}

);

window.setMetal = function(type){

if(!ring) return;

let color;

if(type==="yellow") color="#D4AF37";
if(type==="white") color="#E5E5E5";
if(type==="rose") color="#E6B7A9";

ring.traverse(function(node){

if(node.isMesh){

node.material.color.set(color);

}

});

};

function animate(){

requestAnimationFrame(animate);

controls.update();

renderer.render(scene,camera);

}

animate();

window.addEventListener("resize",function(){

camera.aspect = window.innerWidth / window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

});
