export function createCity(size) {
    const data = [];

    function init() {
        for (let x = 0; x < size; x++) {
            const column = [];
            for (let y = 0; y < size; y++) {
                const tile = createTile(x, y);
                column.push(tile);
            }
            data.push(column);
        }
    }

    init()

    return {
        size,
        data,
    }
}

function createTile(x, y) {
    return {
        x, y,
        terrainId: 'grass',
        buildingId: undefined,
        update() {

        }
    }
}