import * as THREE from 'three';
import {createCamera} from "./cameraManager.js";
import {createAssetInstance} from "./assets.js";

export function createScene() {
    const gameWindow = document.getElementById('render-target')
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x777777);

    const cameraManager = createCamera(gameWindow);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    gameWindow.appendChild(renderer.domElement);

    const reyCaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let train = [];
    let buildings = [];

    let activeObject = undefined;
    let hoverObject = undefined;

    function initialize(city) {
        scene.clear()
        for (let x = 0; x < city.size; x++) {
            const column = [];
            for (let y = 0; y < city.size; y++) {
                const terrainId = city.tiles[x][y].terrainId;
                let mesh = createAssetInstance(terrainId, x, y)
                scene.add(mesh);
                column.push(mesh);
            }
            train.push(column);
            buildings.push([...Array(city.size)]);
        }
        setupLights();
    }

    function update(city) {
        for (let x = 0; x < city.size; x++) {
            for (let y = 0; y < city.size; y++) {
                const tile = city.tiles[x][y];
                const existingBuildingMesh = buildings[x][y];

                if (!tile.building && existingBuildingMesh) {
                    scene.remove(existingBuildingMesh);
                    buildings[x][y] = undefined;
                }

                if (tile.building && tile.building.updated) {
                    scene.remove(buildings[x][y])
                    buildings[x][y] = createAssetInstance(tile.building.type, x, y, tile.building)
                    scene.add(buildings[x][y])
                    tile.building.updated = false;
                }
            }
        }

    }

    function setupLights() {
        const soft = new THREE.DirectionalLight(0xffffff, 0.3)
        soft.position.set(0, 1, 1);

        const sun = new THREE.DirectionalLight(0xffffff, 1);
        sun.position.set(10, 10, 10);
        sun.castShadow = true;
        sun.shadow.camera.left = -12;
        sun.shadow.camera.right = 12;
        sun.shadow.camera.top = 0;
        sun.shadow.camera.bottom = -10;
        sun.shadow.mapSize.width = 1024;
        sun.shadow.mapSize.height = 1024;
        sun.shadow.camera.near = 0.5;
        sun.shadow.camera.far = 50;
        // sun.add(new THREE.CameraHelper(sun.shadow.cameraManager))
        scene.add(soft);
        scene.add(sun);
        scene.add(new THREE.AmbientLight(0xffffff, 0.2));
    }

    function draw() {
        renderer.render(scene, cameraManager.camera);
    }

    function start() {
        renderer.setAnimationLoop(draw)
    }

    function stop() {
        renderer.setAnimationLoop(null);
    }

    function onResize() {
        cameraManager.camera.aspect = gameWindow.offsetWidth / gameWindow.offsetHeight;
        cameraManager.camera.updateProjectionMatrix();
        renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
    }

    function setHighlightedObject(object) {
        // Unhighlight the previously hovered object (if it isn't currently selected)
        if (hoverObject && hoverObject !== activeObject) {
            setObjectEmission(hoverObject, 0x000000);
        }

        hoverObject = object;

        if (hoverObject) {
            // Highlight the new hovered object (if it isn't currently selected))
            setObjectEmission(hoverObject, 0x555555);
        }
    }

    function getSelectedObject(event) {
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

        reyCaster.setFromCamera(mouse, cameraManager.camera);

        let intersection = reyCaster.intersectObjects(scene.children, false);

        if (intersection.length > 0) {
            return intersection[0].object;
        } else {
            return null;
        }
    }

    function setActiveObject(object) {
        // Clear highlight on previously active object
        setObjectEmission(activeObject, 0x000000);
        activeObject = object;
        // Highlight new active object
        setObjectEmission(activeObject, 0xaaaa55);
    }


    function setObjectEmission(object, color) {
        if (!object) return;
        if (Array.isArray(object.material)) {
            object.material.forEach(material => material.emissive?.setHex(color));
        } else {
            object.material.emissive?.setHex(color);
        }
    }

    return {
        cameraManager,
        initialize,
        update,
        start,
        stop,
        onResize,
        getSelectedObject,
        setActiveObject,
        setHighlightedObject
    }
}