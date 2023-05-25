import {createScene} from '/src/scene.js'
import {createCity} from '/src/city.js'

export function createGame() {

    const scene = createScene();
    const city = createCity(16);

    scene.init(city)

    window.scene = scene;
    document.addEventListener('mousedown', window.scene.onMouseDown, false);
    document.addEventListener('mouseup', window.scene.onMouseUp, false);
    document.addEventListener('mousemove', window.scene.onMouseMove, false);
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