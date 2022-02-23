import * as THREE from './libs/three128/three.module.js';
import {GLTFLoader} from './libs/three128/GLTFLoader.js';
import { OrbitControls } from './libs/three128/OrbitControls.js';

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

const loader = new GLTFLoader()
loader.load('/assets/cpusa.glb', function(glb){
	console.log(glb)
	const root = glb.scene;
	root.scale.set(0.1, 0.1, 0.1)
	
	scene.add(root);
}, function(xhr){
	console.log((xhr.loaded/xhr.total * 100) + "% loaded")
}, function(error){
	console.log('an error occured')
})

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(2,2,5)
scene.add(light)

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
camera.position.set(0, 1, 2)
scene.add(camera);

const renderer = new THREE.WebGL1Renderer({
	canvas: canvas
})

const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 4, 4, 4 );
controls.update();


renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.gammaOuput = true; 

function animate(){
	requestAnimationFrame(animate)
	controls.update()
	renderer.render(scene, camera)
}

animate()
