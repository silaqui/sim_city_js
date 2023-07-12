import {createBuilding} from "./buildings.js";

export function createTile(x, y) {
    return {
        x,
        y,
        terrainId: 'grass',
        building: undefined,

        removeBuilding() {
            this.building = null;
        },
        placeBuilding(activeToolId) {
            this.building = createBuilding(activeToolId);
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