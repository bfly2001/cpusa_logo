import * as THREE from './libs/three128/three.module.js';
import {GLTFLoader} from './libs/three128/GLTFLoader.js';
import { OrbitControls } from './libs/three128/OrbitControls.js';

import { addAmbientLighting, addSky, dumpObject, createSpotLight, createSpotLightRepr, createCylinder } from './utils.js';
import { addCameraGUI, updateCameraLookat } from '/gui.js';
import {cpUSA} from './assets/cpusa.glb'

let camera, scene, canvas, cameraControls, renderer

init()
animate()
addCameraGUI()

function init() {
	scene = new THREE.Scene();
	canvas = document.querySelector('.webgl');
	camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
	camera.position.set(91, -84, 155);
	cameraControls = new OrbitControls(camera, canvas);
	cameraControls.target.set(106, 58,44);
	cameraControls.maxDistance = 400;
	cameraControls.minDistance = 10;
	cameraControls.update();

	renderer = new THREE.WebGLRenderer({canvas});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	addAmbientLighting(scene);

	addSky(scene);

	const loader = new GLTFLoader()
	loader.load(cpUSA, function (gltf){
	const root = glb.scene;
	root.rotateX(Math.PI/2)
	scene.add(root);
	console.log(dumpObject(root).join('\n'))

	let logo = root.getObjectByName('cpusa');
	logo.position.set(0, -0.4, -8)
	logo.rotation.set(-Math.PI/2, 2, 0, 0)
	logo.children[0].castShadow = true
	logo.children[0].receiveShadow = false

	let light = createSpotLight()
	let light_representation = createSpotLightRepr()
	let cylinder = createCylinder()

	const partySignal = new THREE.Group()
	partySignal.add(light);
	partySignal.add(light.target);
	partySignal.add(light_representation);
	partySignal.add(logo);
	partySignal.add(cylinder);

	partySignal.position.set(130, 0, 50)
	partySignal.rotation.set(Math.PI*3/9, Math.PI*2/9, 0)

	scene.add(partySignal);
 });
}

function animate(){
	updateCameraLookat(cameraControls)
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
};


