import {createCitizen} from "../citizens.js";

export function createResidentialBuilding(x, y) {
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
