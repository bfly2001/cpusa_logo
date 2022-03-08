import * as THREE from 'three';
import SKY from './assets/sky.jpeg';

export function dumpObject(obj, lines=[], isLast = true, prefix=''){
    const localPrefix = isLast ? '└─': '├─'
    lines.push(`${prefix}${prefix ? localPrefix: ''}${obj.name || '*no-name*'}[${obj.type}]`)
    const newPrefix = prefix + (isLast ? ' ' : '| ')
    const lastNdx = obj.children.length - 1
    obj.children.forEach((child, ndx) => {
        const isLast = ndx === lastNdx
        dumpObject(child, lines, isLast, newPrefix)
    });
    return lines
}

export function addAmbientLighting(scene){
    const amLight = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add(amLight);
}

export function createSpotLight(){
    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.castShadow = true;
    spotLight.position.set(0,0,10);
    spotLight.target.position.set(0,0,0);
    spotLight.angle = Math.PI/14;
    spotLight.penumbra = 0.35;

    spotLight.shadow.mapSize.width = 512;
    spotLight.shadow.mapSize.height = 512;
    spotLight.shadow.camera.near = 0.5;
    spotLight.shadow.camera.far = 500;
    spotLight.shadow.focus = 1;

    return spotLight
}

export function createSpotLightRepr(){
    const geometry = new THREE.SphereGeometry(1,6,6);
    const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    const sphere = new THREE.Mesh( geometry, material);
    sphere.position.set(0, 0, 10);
    
    return sphere
}

export function createCylinder(){
    const cylgeometry = new THREE.CylinderGeometry(10,10,16,12,10,true);
    const cylmaterial = new THREE.MeshBasicMaterial({color: 0x555555, opacity: 0.5, transparent: true, side: THREE.DoubleSide});
    const cylinder = new THREE.Mesh(cylgeometry, cylmaterial);
    cylinder.rotation.set(-Math.PI/2, 0, 0);

    return cylinder
}

export function addSky(scene){
    let width = 960;
    let length = 670;
    const textureLoader = new THREE.TextureLoader();
    const geometry = new THREE.PlaneGeometry(width, length);
    const material = new THREE.MeshPhongMaterial( {map: textureLoader.load(SKY)});
    const plane = new THREE.Mesh(geometry, material);
    plane.receiveShadow = true;
    plane.position.set(150,150,20);
    plane.rotation.set(Math.PI/2,0,0);
    scene.add(plane);
}
    
