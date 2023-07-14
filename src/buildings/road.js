export function createRoad(x, y) {
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