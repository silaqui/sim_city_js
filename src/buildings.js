import {createCitizen} from "./citizens.js";

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

function createResidentialBuilding(x, y) {
    return {
        x,
        y,
        id: crypto.randomUUID(),
        type: 'residential',
        style: Math.floor(3 * Math.random() + 1),
        height: 1,
        updated: true,
        residents: [],
        maxResidents: 4,

        update(city) {
            if (this.residents.length < this.maxResidents) {
                const resident = createCitizen(this);
                this.residents.push(resident);
                city.citizens.push(resident);
                console.log(resident);
            }
            if (Math.random() < 0.05) {
                if (this.height < 4) {
                    this.height += 1;
                    this.updated = true;
                }
            }
        },
        toHtml() {
            let html = '';
            html += `<br><strong>Building</strong><br>`
            html += `Type: ${this.type}<br>`
            html += `Style: ${this.style}<br>`
            html += `Height: ${this.height}<br>`

            html += `<br><strong>Residential</strong><br>`

            html += `<ui style="margin-top: 0; padding-left: 20px">`

            if (this.residents.length > 0) {
                for (const resident of this.residents) {
                    html += `<li>${resident.toHtml()}</li>`
                }
            } else {
                html += `<li>None</li>`
            }

            html += `</ui>`

            return html;
        }
    }
}

function createCommercialBuilding(x, y) {
    return {
        x,
        y,
        id: crypto.randomUUID(),
        type: 'commercial',
        name: generateBusinessName(),
        style: Math.floor(3 * Math.random() + 1),
        height: 1,
        updated: true,
        workers: [],
        maxWorkers: 4,
        numbersOfJobsAvailable() {
            return this.maxWorkers - this.workers.length
        },
        numbersOfJobsFilled() {
            return this.workers.length
        },
        update(city) {
            if (Math.random() < 0.01) {
                if (this.height < 4) {
                    this.height += 1;
                    this.updated = true;
                }
            }
        },
        toHtml() {
            let html = '';
            html += `<br><strong>Building</strong><br>`
            html += `Type: ${this.type}<br>`
            html += `Style: ${this.style}<br>`
            html += `Height: ${this.height}<br>`

            html += `<br><strong>Commercial ${this.numbersOfJobsFilled()}/${this.maxWorkers}</strong><br>`

            html += `<ui style="margin-top: 0; padding-left: 20px">`

            if (this.workers.length > 0) {
                for (const resident of this.workers) {
                    html += `<li>${resident.toHtml()}</li>`
                }
            } else {
                html += `<li>None</li>`
            }

            return html;
        },
    }
}

const prefixes = ['Apex', 'Vortex', 'Elevate', 'Zenith', 'Nova', 'Synapse', 'Pulse', 'Enigma', 'Catalyst', 'Axiom'];
const suffixes = ['Dynamics', 'Ventures', 'Solutions', 'Technologies', 'Innovations', 'Industries', 'Enterprises', 'Systems', 'Mechanics', 'Manufacturing'];
const businessSuffixes = ['LLC', 'Inc.', 'Co.', 'Corp.', 'Ltd.'];

function generateBusinessName() {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const businessSuffix = businessSuffixes[Math.floor(Math.random() * businessSuffixes.length)];

    return prefix + ' ' + suffix + ' ' + businessSuffix;
}

function createIndustrialBuilding(x, y) {
    return {
        x,
        y,
        id: crypto.randomUUID(),
        type: 'industrial',
        name: generateBusinessName(),
        style: Math.floor(3 * Math.random() + 1),
        height: 1,
        updated: true,
        workers: [],
        maxWorkers: 4,
        numbersOfJobsAvailable() {
            return this.maxWorkers - this.workers.length
        },
        numbersOfJobsFilled() {
            return this.workers.length
        },
        update(city) {
            if (Math.random() < 0.01) {
                if (this.height < 4) {
                    this.height += 1;
                    this.updated = true;
                }
            }
        },
        toHtml() {
            let html = '';
            html += `<br><strong>Building</strong><br>`
            html += `Type: ${this.type}<br>`
            html += `Style: ${this.style}<br>`
            html += `Height: ${this.height}<br>`

            html += `<br><strong>Industrial ${this.numbersOfJobsFilled()}/${this.maxWorkers}</strong><br>`

            html += `<ui style="margin-top: 0; padding-left: 20px">`

            if (this.workers.length > 0) {
                for (const resident of this.workers) {
                    html += `<li>${resident.toHtml()}</li>`
                }
            } else {
                html += `<li>None</li>`
            }
            return html;
        }
    }
}

// const prefixes = ['Apex', 'Vortex', 'Elevate', 'Zenith', 'Nova', 'Synapse', 'Pulse', 'Enigma', 'Catalyst', 'Axiom'];
// const suffixes = ['Dynamics', 'Ventures', 'Solutions', 'Technologies', 'Innovations', 'Industries', 'Enterprises', 'Systems', 'Mechanics', 'Manufacturing'];
// const businessSuffixes = ['LLC', 'Inc.', 'Co.', 'Corp.', 'Ltd.'];
//
// function generateBusinessName() {
//     const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
//     const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
//     const businessSuffix = businessSuffixes[Math.floor(Math.random() * businessSuffixes.length)];
//
//     return prefix + ' ' + suffix + ' ' + businessSuffix;
// }

function createRoad(x, y) {
    return {
        x,
        y,
        id: crypto.randomUUID(),
        type: 'road',
        updated: true,
        update(city) {
            this.updated = false;
        },
        toHtml() {
            let html = '';
            html += `<br><strong>Building</strong><br>`
            html += `Type: ${this.type}<br>`
            return html;
        }
    }
}