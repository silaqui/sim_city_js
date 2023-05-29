import {createScene} from '/src/scene.js'
import {createCity} from '/src/city.js'
import buildingsFactory from '/src/buildings.js'

export function createGame() {

    let activeToolId = 'bulldoze';
    const scene = createScene();
    const city = createCity(16);

    scene.init(city)

    scene.onObjectSelected = (selectedObject) => {
        let {x, y} = selectedObject.userData;
        const tile = city.data[x][y];

        if (activeToolId === 'bulldoze') {
            tile.building = undefined;
            scene.update(city);
        } else if (!tile.building) {
            tile.building = buildingsFactory[activeToolId]();
            scene.update(city);
        }
    }

    window.scene = scene;
    document.addEventListener('mousedown', window.scene.onMouseDown.bind(scene), false);
    document.addEventListener('mouseup', window.scene.onMouseUp.bind(scene), false);
    document.addEventListener('mousemove', window.scene.onMouseMove.bind(scene), false);
    document.addEventListener('contextmenu', (event) => event.preventDefault(), false);

    const game = {
        update() {
            city.update()
            scene.update(city);
        },
        setActiveToolId(toolId) {
            activeToolId = toolId;
            console.log(activeToolId);
        }
    }

    setInterval(() => {
        game.update()
    }, 1000)

    scene.start();

    return game;
}