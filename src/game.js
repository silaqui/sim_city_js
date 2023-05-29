import {createScene} from '/src/scene.js'
import {createCity} from '/src/city.js'
import buildingsFactory from '/src/buildings.js'

window.onload = () => {
    window.game = createGame();
}

export function createGame() {

    let selectedControl = document.getElementById('button-select');
    let activeToolId = 'select';
    let isPaused = false;

    const scene = createScene();
    const city = createCity(16);

    scene.initialize(city)

    document.addEventListener('wheel', scene.cameraManager.onMouseScroll, false);
    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', scene.onResize, false);

    document.addEventListener('contextmenu', (event) => event.preventDefault(), false);

    function update() {
        if (isPaused) return;
        city.update();
        scene.update(city);
    }

    function onMouseDown(event) {
        if (event.button === 0) {
            const selectedObject = scene.getSelectedObject(event);
            useActiveTool(selectedObject);
        }
    }

    function togglePause() {
        isPaused = !isPaused;
        document.getElementById('button-pause').innerHTML = isPaused ? 'RESUME' : 'PAUSE';
    }

    let lastMove = new Date();

    function onMouseMove(event) {
        if (Date.now() - lastMove < (1 / 60.0)) return;
        lastMove = Date.now();

        const hoverObject = scene.getSelectedObject(event);

        scene.setHighlightedObject(hoverObject);

        if (hoverObject && event.buttons & 1) {
            useActiveTool(hoverObject);
        }

        scene.cameraManager.onMouseMove(event);
    }

    function onToolSelected(event) {
        if (selectedControl) {
            selectedControl.classList.remove('selected');
        }
        selectedControl = event.target;
        selectedControl.classList.add('selected');

        activeToolId = selectedControl.getAttribute('data-type');
        console.log(activeToolId);
    }

    function useActiveTool(object) {
        if (!object) {
            updateInfoPanel(null);
            return;
        }

        const {x, y} = object.userData;
        const tile = city.tiles[x][y];

        if (activeToolId === 'select') {
            scene.setActiveObject(object);
            updateInfoPanel(tile);
        } else if (activeToolId === 'bulldoze') {
            bulldoze(tile);
        } else if (!tile.building) {
            placeBuilding(tile);
        }
    }

    function updateInfoPanel(tile) {
        document.getElementById('selected-object-info').innerHTML = tile ? JSON.stringify(tile, ' ', 2) : '';
    }

    function bulldoze(tile) {
        console.log(activeToolId);
        tile.building = undefined;
        scene.update(city);
        console.log(tile);
    }

    function placeBuilding(tile) {
        console.log(activeToolId);
        tile.building = buildingsFactory[activeToolId]();
        scene.update(city);
        console.log(tile);
    }

    setInterval(() => {
        game.update();
    }, 1000)

    scene.start();

    return {
        update, onToolSelected, togglePause
    };
}

