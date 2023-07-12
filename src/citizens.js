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
        name: getRandomName(),
        age: 1 + Math.floor(100 * Math.random()),
        house,

        update(city) {

        }
    }
}

