import {createResidentialBuilding} from "./residential.js";
import {createCommercialBuilding} from "./commercial.js";
import {createIndustrialBuilding} from "./industrial.js";
import {createRoad} from "./road.js";

export function createBuilding(x, y, buildingType) {
    switch (buildingType) {
        case 'residential' :
            return createResidentialBuilding(x, y);
        case 'commercial' :
            return createCommercialBuilding(x, y);
        case 'industrial' :
            return createIndustrialBuilding(x, y);
        case 'road' :
            return createRoad(x, y);
        default:
            console.error(`${buildingType} is not recognized.`);
    }
}