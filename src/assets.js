import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

const assets = {
    "grass": (x, y) => {
        const material = new THREE.MeshLambertMaterial({color: 0x00aa00});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = {id: `grass`, x, y};
        mesh.position.set(x, -0.5, y);
        return mesh
    },
    "residential": (x, y, data) => {
        const material = new THREE.MeshLambertMaterial({color: 0x00ff00});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = {id: `residential`, x, y};
        mesh.position.set(x, data.height / 2, y);
        mesh.scale.set(1, data.height, 1);
        return mesh;
    },
    "commercial": (x, y, data) => {
        const material = new THREE.MeshLambertMaterial({color: 0x0000ff});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = {id: `commercial`, x, y};
        mesh.position.set(x, data.height / 2, y);
        mesh.scale.set(1, data.height, 1);
        return mesh;
    },
    "industrial": (x, y, data) => {
        const material = new THREE.MeshLambertMaterial({color: 0xffff00});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = {id: `industrial`, x, y};
        mesh.position.set(x, data.height / 2, y);
        mesh.scale.set(1, data.height, 1);
        return mesh;
    },
    "road": (x, y) => {
        const material = new THREE.MeshLambertMaterial({color: 0x444440});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = {id: `road`, x, y};
        mesh.position.set(x, 0.05, y);
        mesh.scale.set(1, 0.1, 1);
        return mesh;
    },
}

export function createAssetInstance(assetId, x, y, data) {
    if (assetId in assets) {
        return assets[assetId](x, y, data)
    } else {
        console.warn(`AssetId: ${assetId} not found! ${x}-${y}`)
        return undefined
    }
}