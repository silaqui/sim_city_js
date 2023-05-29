import * as THREE from 'three';

export function createCamera(gameWindow) {
    const DEG2RAD = Math.PI / 180;

    const MIDDLE_MOUSE_BUTTON = 4;
    const RIGHT_MOUSE_BUTTON = 2;

    const MIN_CAMERA_RADIUS = 10;
    const MAX_CAMERA_RADIUS = 20;
    const MIN_CAMERA_ELEVATION = 30;
    const MAX_CAMERA_ELEVATION = 89.9;

    const AZIMUTH_SENSITIVITY = 0.2;
    const ELEVATION_SENSITIVITY = 0.2;
    const ZOOM_SENSITIVITY = 0.02;
    const PAN_SENSITIVITY = -0.01;

    const Y_AXIS = new THREE.Vector3(0, 1, 0);

    const camera = new THREE.PerspectiveCamera(75, gameWindow.offsetWidth / gameWindow.offsetHeight, 0.1, 1000);
    let cameraOrigin = new THREE.Vector3(8, 0, 8)
    let cameraRadius = (MIN_CAMERA_RADIUS + MAX_CAMERA_RADIUS) / 2;
    let cameraAzimuth = 30;
    let cameraElevation = 45;

    updateCameraPosition();

    function onMouseMove(event) {

        if (event.buttons & RIGHT_MOUSE_BUTTON) {
            cameraAzimuth += -(event.movementX * AZIMUTH_SENSITIVITY);
            cameraElevation += (event.movementY * ELEVATION_SENSITIVITY);
            cameraElevation = Math.min(MAX_CAMERA_ELEVATION, Math.max(MIN_CAMERA_ELEVATION, cameraElevation));
        }

        if (event.buttons & MIDDLE_MOUSE_BUTTON) {
            const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD);
            const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD);
            cameraOrigin.add(forward.multiplyScalar(PAN_SENSITIVITY * event.movementY));
            cameraOrigin.add(left.multiplyScalar(PAN_SENSITIVITY * event.movementX));
        }

        updateCameraPosition();
    }

    function onMouseScroll(event) {
        cameraRadius += event.deltaY * ZOOM_SENSITIVITY;
        cameraRadius = Math.min(MAX_CAMERA_RADIUS, Math.max(MIN_CAMERA_RADIUS, cameraRadius));
    }

    function updateCameraPosition() {
        camera.position.x = cameraRadius * Math.sin(cameraAzimuth * DEG2RAD) * Math.cos(cameraElevation * DEG2RAD);
        camera.position.y = cameraRadius * Math.sin(cameraElevation * DEG2RAD)
        camera.position.z = cameraRadius * Math.cos(cameraAzimuth * DEG2RAD) * Math.cos(cameraElevation * DEG2RAD);
        camera.position.add(cameraOrigin);
        camera.lookAt(cameraOrigin);
        camera.updateMatrix();
    }

    return {
        camera,
        onMouseMove,
        onMouseScroll
    }

}