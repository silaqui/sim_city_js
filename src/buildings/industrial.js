export function createIndustrialBuilding(x, y) {
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
        dispose() {
            for (const w of this.workers) {
                w.setJob(null)
            }
        },
        toHtml() {
            let html = '';
            html += `<br><strong>Building</strong><br>`
            html += `Name: ${this.name}<br>`
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

const prefixes = ['Apex', 'Vortex', 'Elevate', 'Zenith', 'Nova', 'Synapse', 'Pulse', 'Enigma', 'Catalyst', 'Axiom'];
const suffixes = ['Dynamics', 'Ventures', 'Solutions', 'Technologies', 'Innovations', 'Industries', 'Enterprises', 'Systems', 'Mechanics', 'Manufacturing'];
const businessSuffixes = ['LLC', 'Inc.', 'Co.', 'Corp.', 'Ltd.'];

function generateBusinessName() {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const businessSuffix = businessSuffixes[Math.floor(Math.random() * businessSuffixes.length)];

    return prefix + ' ' + suffix + ' ' + businessSuffix;
}

