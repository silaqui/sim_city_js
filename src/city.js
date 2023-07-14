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

            for (const c of citizens) {
                c.update(this);
            }
        },

        getPopulation() {
            return citizens.length;
        },

        findTile(start, criteria, maxDistance) {
            {
                const startTile = this.tiles[start.x][start.y];
                const visited = new Set();
                const tilesToSearch = [];

                tilesToSearch.push(startTile);

                while (tilesToSearch.length > 0) {
                    const tile = tilesToSearch.shift();
                    if (visited.has(tile.id)) {
                        continue;
                    } else {
                        visited.add(tile.id);
                    }

                    const dist = startTile.distanceTo(startTile);

                    if (dist > maxDistance) {
                        continue;
                    }

                    if (criteria(tile)) {
                        return tile
                    } else {
                        tilesToSearch.push(...this.getTileNeighbors(tile.x, tile.y));
                    }
                }
                return null
            }

        },
        getTileNeighbors(x, y) {
            const neighbors = [];

            if (x > 0) neighbors.push(tiles[x - 1][y]);
            if (y > 0) neighbors.push(tiles[x][y - 1]);
            if (x < this.size - 1) neighbors.push(tiles[x + 1][y]);
            if (y < this.size - 1) neighbors.push(tiles[x][y + 1]);

            return neighbors;
        }

    }
}
