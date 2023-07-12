import {createTile} from "./tile.js";

export function createCity(size) {
    const tiles = [];
    const citizens = [];
    function init() {
        for (let x = 0; x < size; x++) {
            const column = [];
            for (let y = 0; y < size; y++) {
                const tile = createTile(x, y);
                column.push(tile);
            }
            tiles.push(column);
        }
    }


    init()

    return {
        size,
        tiles,
        citizens,

        update() {
            for (let x = 0; x < size; x++) {
                for (let y = 0; y < size; y++) {
                    tiles[x][y].building?.update(this);
                }
            }
        },

        getPopulation() {
            return citizens.length;
        }

    }
}
