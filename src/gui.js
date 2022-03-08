import { GUI } from './libs/dat.gui-master/build/dat.gui.module.js'

let gui
let cameraLookat = {
    'lookX': 106,
    'lookY': 58,
    'lookZ': 44,
}

function getGUI(){
    if (!gui){
        gui = new GUI()
    }
    return gui
}

export function addCameraGUI(camera){
    gui = getGUI()
    const camFolder = gui.addFolder('Camera')
    camFolder.add(camera.position, 'x', -200, 200)
    camFolder.add(camera.position, 'y', -200, 200)
    camFolder.add(camera.position, 'z', -200, 200)
    camFolder.add(cameraLookat, 'LookX', -200, 200)
    camFolder.add(cameraLookat, 'LookY', -200, 200)
    camFolder.add(cameraLookat, 'LookZ', -200, 200)
    camFolder.open()
}

export function updateCameraLookat(cameraControls){
    cameraControls.target.set(cameraLookat.lookX, cameraLookat.lookY, cameraLookat.lookZ);
    cameraControls.update()
}