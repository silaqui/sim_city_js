import {createBuilding} from "./buildings/buildings.js";

export function createTile(x, y) {
    return {
        id: crypto.randomUUID(),
        x,
        y,
        terrainId: 'grass',
        building: undefined,

        removeBuilding() {
            this.building = null;
        },
        placeBuilding(activeToolId) {
            this.building = createBuilding(x, y, activeToolId);
        },
        distanceTo(tile) {
            return Math.abs(this.x - tile.x) + Math.abs(this.y - tile.y);
        },

        toHtml() {
            let html = '';
            html += `Coordinates: (X: ${this.x}, Y: ${this.y})<br>`
            html += `Terrain: ${this.terrainId}<br>`

            if (this.building) {
                html += `${this.building.toHtml()}`
            }

            return html;
        }
    }

}