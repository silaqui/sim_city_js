import * as THREE from 'three';
import {createCamera} from "./camera.js";

export function createScene() {
    const gameWindow = document.getElementById('render-target')
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x777777);

    const camera = createCamera(gameWindow);

    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);

    gameWindow.appendChild(renderer.domElement);

    let meshes = [];
    let buildings = [];

    function init(city) {
        scene.clear()

        for (let x = 0; x < city.size; x++) {
            const column = [];
            for (let y = 0; y < city.size; y++) {
                // grass
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshLambertMaterial({color: 0x00aa00});
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(x, -0.5, y);
                // add to scene
                scene.add(mesh);
                // add to meshes array
                column.push(mesh);
            }
            meshes.push(column);
            buildings.push([...Array(city.size)]);
        }
        setupLights();
    }

    function update(city){
        for (let x = 0; x < city.size; x++) {
            for (let y = 0; y < city.size; y++) {
                // building
                const tile = city.data[x][y]

                if (tile.building && tile.building.startsWith('building')) {
                    const height = Number(tile.building.slice(-1))
                    const buildingGeometry = new THREE.BoxGeometry(1, height, 1);
                    const buildingMaterial = new THREE.MeshLambertMaterial({color: 0x777777});
                    const buildingMesh = new THREE.Mesh(buildingGeometry, buildingMaterial)
                    buildingMesh.position.set(x, height / 2, y);
                    // add to scene
                    if(buildings[x][y])(
                        scene.remove(buildings[x][y])
                    )
                    scene.add(buildingMesh)
                    // add to meshes array
                    buildings[x][y] = meshes
                }
            }
        }

    }
    function setupLights() {

        const lights = [
            new THREE.AmbientLight(0xffffff, 0.2),
            new THREE.DirectionalLight(0xffffff, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3)
        ]

        lights[1].position.set(0, 1, 0);
        lights[2].position.set(1, 1, 0);
        lights[3].position.set(0, 1, 1);

        scene.add(...lights);
    }

    function draw() {
        renderer.render(scene, camera.camera);
    }

    function start() {
        renderer.setAnimationLoop(draw)
    }

    function stop() {
        renderer.setAnimationLoop(null)
    }

    function onMouseDown(event) {
        camera.onMouseDown(event)
    }

    function onMouseUp(event) {
        camera.onMouseUp(event)
    }

    function onMouseMove(event) {
        camera.onMouseMove(event)
    }

    return {
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove,
        init,
        update
    }
}