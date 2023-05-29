import * as THREE from 'three';

const cube = new THREE.BoxGeometry(1, 1, 1);

let textureLoader = new THREE.TextureLoader();

function loadTexture(url) {
    const texture = textureLoader.load(url)
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    return texture
}

const textures = {
    'grass': loadTexture('public/textures/grass.png'),
    'residential1': loadTexture('public/textures/industrial3.png'),
    'residential2': loadTexture('public/textures/industrial3.png'),
    'residential3': loadTexture('public/textures/industrial3.png'),
    'commercial1': loadTexture('public/textures/industrial3.png'),
    'commercial2': loadTexture('public/textures/industrial3.png'),
    'commercial3': loadTexture('public/textures/industrial3.png'),
    'industrial1': loadTexture('public/textures/industrial3.png'),
    'industrial2': loadTexture('public/textures/industrial3.png'),
    'industrial3': loadTexture('public/textures/industrial3.png'),
}

function getTopMaterial() {
    return new THREE.MeshLambertMaterial({color: 0x555555});
}

function getSideMaterial(textureName) {
    return new THREE.MeshLambertMaterial({map: textures[textureName].clone()});
}

const assets = {
    "grass": (x, y) => {
        const material = new THREE.MeshLambertMaterial({color: 0x00aa00});
        const mesh = new THREE.Mesh(cube, material);
        mesh.userData = {id: `grass`, x, y};
        mesh.position.set(x, -0.5, y);
        mesh.receiveShadow = true;
        return mesh
    },
    "residential": (x, y, data) => createZoneMesh(x, y, data),
    "commercial": (x, y, data) => createZoneMesh(x, y, data),
    "industrial": (x, y, data) => createZoneMesh(x, y, data),
    "road": (x, y) => {
        const material = new THREE.MeshLambertMaterial({color: 0x444440});
        const mesh = new THREE.Mesh(cube, material);
        mesh.userData = {id: `road`, x, y};
        mesh.position.set(x, 0.05, y);
        mesh.scale.set(1, 0.1, 1);
        return mesh;
    },
}

function createZoneMesh(x, y, data) {
    const textureName = data.type + data.style

    const topMaterial = getTopMaterial();
    const sideMaterial = getSideMaterial(textureName);
    let materialArray = [
        sideMaterial, // +X
        sideMaterial, // -X
        topMaterial, // +y
        topMaterial, // -Y
        sideMaterial, // +Z
        sideMaterial, // -Z
    ];

    let mesh = new THREE.Mesh(cube, materialArray);
    mesh.userData = {x, y};
    mesh.scale.set(0.8, (data.height - 0.95) / 2, 0.8);
    mesh.material.forEach(material => material.map?.repeat.set(1, data.height - 1));
    mesh.position.set(x, (data.height - 0.95) / 4, y);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;

}

export function createAssetInstance(assetId, x, y, data) {
    if (assetId in assets) {
        return assets[assetId](x, y, data)
    } else {
        console.warn(`AssetId: ${assetId} not found! ${x}-${y}`)
        return undefined
    }
}