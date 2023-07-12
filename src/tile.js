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
        }
    }

}