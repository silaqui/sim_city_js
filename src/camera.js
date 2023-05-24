import * as THREE from 'three';

export function createCamera(gameWindow) {
    const LEFT_MOUSE_BUTTON = 0;
    const MIDDLE_MOUSE_BUTTON = 1;
    const RIGHT_MOUSE_BUTTON = 2;

    const MIN_CAMERA_RADIUS = 2;
    const MAX_CAMERA_RADIUS = 10;

    const camera = new THREE.PerspectiveCamera(75, gameWindow.offsetWidth / gameWindow.offsetHeight, 0.1, 1000);

    let cameraRadius = 4;
    let cameraAzimuth = 0;
    let cameraElevation = 0;
    let isLeftMouseDown = false;
    let isRightMouseDown = false;
    let isMiddleMouseDown = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    updateCameraPosition();


    function onMouseDown(event) {
        if (event.button === LEFT_MOUSE_BUTTON) isLeftMouseDown = true;
        if (event.button === MIDDLE_MOUSE_BUTTON) isMiddleMouseDown = true;
        if (event.button === RIGHT_MOUSE_BUTTON) isRightMouseDown = true;
    }

    function onMouseUp(event) {
        if (event.button === LEFT_MOUSE_BUTTON) isLeftMouseDown = false;
        if (event.button === MIDDLE_MOUSE_BUTTON) isMiddleMouseDown = false;
        if (event.button === RIGHT_MOUSE_BUTTON) isRightMouseDown = false;
    }

    function onMouseMove(event) {
        let deltaX = event.clientX - prevMouseX;
        let deltaY = event.clientY - prevMouseY;

        if (isLeftMouseDown) {
            cameraAzimuth += -(deltaX * 0.5);
            cameraElevation += (deltaY * 0.5);
            cameraElevation = Math.min(90, Math.max(0, cameraElevation));
            updateCameraPosition();
        }

        if (isMiddleMouseDown){

        }

        if (isRightMouseDown) {
            cameraRadius += deltaY * 0.02;
            cameraRadius = Math.min(MAX_CAMERA_RADIUS, Math.max(MIN_CAMERA_RADIUS, cameraRadius));
            updateCameraPosition();
        }

        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
    }

    function updateCameraPosition() {
        camera.position.x = cameraRadius * Math.sin(cameraAzimuth * Math.PI / 180) * Math.cos(cameraElevation * Math.PI / 180);
        camera.position.y = cameraRadius * Math.sin(cameraElevation * Math.PI / 180)
        camera.position.z = cameraRadius * Math.cos(cameraAzimuth * Math.PI / 180) * Math.cos(cameraElevation * Math.PI / 180);
        camera.lookAt(0, 0, 0);
        camera.updateMatrix();
    }

    return {
        camera,
        onMouseDown,
        onMouseUp,
        onMouseMove
    }

}