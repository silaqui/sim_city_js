export function createCitizen(house) {
    function getRandomName() {
        const names = [
            "Alice",
            "Bob",
            "Charlie",
            "David",
            "Eve",
            "Frank",
            "Grace",
            "Henry",
            "Isabella",
            "Jack",
            "Kate",
            "Liam",
            "Mia",
            "Noah",
            "Olivia",
            "Patrick",
            "Quinn",
            "Ryan",
            "Sophia",
            "Thomas",
            "Ursula",
            "Victor",
            "Wendy",
            "Xavier",
            "Yara",
            "Zoe"
        ];

        const lastNames = [
            "Anderson",
            "Brown",
            "Clark",
            "Davis",
            "Evans",
            "Ford",
            "Garcia",
            "Harris",
            "Irwin",
            "Johnson",
            "King",
            "Lopez",
            "Miller",
            "Nguyen",
            "O'Connor",
            "Parker",
            "Quinn",
            "Robinson",
            "Smith",
            "Taylor",
            "Underwood",
            "Valdez",
            "Williams",
            "Xu",
            "Young",
            "Zhang"
        ];

        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

        return randomName + " " + randomLastName;
    }

    return {
        id: crypto.randomUUID(),
        name: getRandomName(),
        age: 1 + Math.floor(100 * Math.random()),
        state: 'unemployed',
        stateCounter: 0,
        job: null,
        house,

        update(city) {
            switch (this.state) {
                case 'unemployed':
                    console.log(`Citizen ${this.id} is looking for a job.`);
                    this.job = this.findJob(city);
                    if (this.job) {
                        console.log(`Citizen ${this.id} found job ${this.job.name}.`);
                        this.state = "employed";
                    }
                    break;
                case 'employed':
                    if (!this.job) {
                        console.log(`Citizen ${this.id} lost job.`);
                        this.state = 'unemployed'
                    }
                    break;
                default:
                    console.error(`Citizen ${this.id} in not recognized stete: ${this.state}.`);
            }
        },
        findJob(city) {
            const tile = city.findTile(this.house, (tile) => {
                    if (!tile.building) return false
                    const buildingType = tile.building?.type;

                    if (buildingType === 'industrial' || buildingType === 'commercial') {
                        if (tile.building.numbersOfJobsAvailable() > 0) {
                            return true;
                        }
                    }
                    return false;
                },
                10
            );
            if (tile != null) {
                tile.building.workers.push(this);
                return tile.building;
            } else {
                return null;
            }
        },
        toHtml() {
            let html = '';
            html += `<span>${this.name} | ${this.age} | ${this.job?.name ?? 'Unemployed'}</span>`
            return html
        }
    }
}

