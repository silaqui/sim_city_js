import {createScene} from '/src/scene.js'
import {createCity} from '/src/city.js'

export function createGame() {

    const scene = createScene();
    const city = createCity(16);

    scene.init(city)

    scene.onObjectSelected = (selectedObject) => {
        console.log(selectedObject);

        let {x, y} = selectedObject.userData;

        const tile = city.data[x][y];

        console.log(tile)

    }

    window.scene = scene;
    document.addEventListener('mousedown', window.scene.onMouseDown.bind(scene), false);
    document.addEventListener('mouseup', window.scene.onMouseUp.bind(scene), false);
    document.addEventListener('mousemove', window.scene.onMouseMove.bind(scene), false);
    document.addEventListener('contextmenu', (event) => event.preventDefault(), false);

    const game = {
        update() {
            city.update();
            scene.update(city);
        }
    }

    setInterval(() => {
        game.update()
    }, 1000)

    window.scene.start();
}