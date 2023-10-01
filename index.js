import * as THREE from "three"
import { OrbitControls } from 'OrbitControls'; // importation de l'addon Orbit Controls pour la gestion de la caméra
import { TrackballControls } from 'TrackballControls'; // importation de l'addon Orbit Controls pour la gestion de la caméra

const axiom = "F*+*-*F/+F+F-FFF+FF/F*-*+F+F*+F+*F*-*+F-F*-*F+F*-*+F*+FF/+F/F-+*F++F/F-+FF-F/FF-F/FF/F+F/FF/F-F/FF/+F-F+*F*+F-F/FF/F-+FF*-*+F/+F/+*F-*F/F+FF/+F+F/+F/F+F*+FF/F-+*F/F-F/+F+F/F-F/FF*+FF/F-+FF/F+F-+*F-F*-*F-F+F/F*-*F/F+F/+F/FF+F/FF/F*-*F/+F/+F/F+F*+FF/+F+F/+F/F+F*+FF/F-+*F/F-F/+F+F/F-F/FF*+FF/F-+FF/F+F-+*F-F*-*F-F+F/F*-*F/F+F/+F/FF+F/FF/F*-*F/+F/+F/F+F*+FF/+F+F/+F/F+F*+FF/F-+*F/F-F/+F+F/F-F/FF*+FF/F-+FF/F+F-+*F-F*-*F-F+F/F*-*F/F+F/+F/FF+F/FF/F*-*F/+F/+F/F+F*+FF/+F+F/+F/F+F*+FF/F-+*F/F-F/+F+F/F-F/FF*+FF/F-+FF/F+F-+*F-F*-*F-F+F/F*-*F/F+F/+F/FF+F/FF/F*-*F/+F/+F/F+F*+FF/+F+F/+F/F+F*+FF/F-+*F/F-F/+F+F/F-F/FF*+FF/F-+FF/F+F-+*F-F*-*F-F+F/F*-*F/F+F/+F/FF+F/FF/F*-*F/+F/+F/F+F*+FF/+F+F/+F/F+F*+FF/F-+*F/F-F/+F+F/F-F/FF*+FF/F-+FF/F+F-+*F-F*-*F-F+F/F*-*F/F+F/+F/FF+F/FF/F*-*F/+F/+F/F+F*+FF/+F+F/+F/F+F*+FF/F-+*F/F-F/+F+F/F-F/FF*+FF/F-+FF/F+F-+*F-F*-*F-F+F/F*-*F/F+F/+F/FF+F/FF/F*-*F/+F/+F/F+F*+FF/+F+F/+F/F+F*+FF/F-+*F/F-F/+F+F/F-F/FF*+FF/F-+FF/F+F-+*F-F*-*F-F+F/F*-*F/F+F/+F/FF+F/FF/F*-*F/+F/+F/F+F*+FF/+F+F/+F/F+F*+FF/F-+*F/F-F/+F+F/F-F/FF*+FF/F-+FF/F+F-+"
// const axiom = "F"
// const axiom = "F-F+*F/F"

const char = ["F", "F", "F", "F", "F", "+", "-", "*", "/"]
const length = Math.ceil(Math.random()*15)
var randomPattern = ""

for (let i = 0; i <= length; i++) {
    const letter = Math.floor(Math.random()*9)
    randomPattern += char[letter]
}

console.log(randomPattern)

const pattern1 = "F+F-F-F+F"
const pattern2 = "F*F*F*F*F*F/F"
const pattern3 = "F-F*F-F"
const pattern4 = "F/F**FF**F/F/F"
const pattern5 = "F/FF*F**F/F*F*F**F/FF*F"

const texture = new THREE.TextureLoader().load( "./texture2.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.rotation = Math.PI/2
texture.repeat.set( 1, 5);

Number.prototype.mod = function (n) {
    "use strict";
    return ((this % n) + n) % n;
};

// définition de la scene et de la caméra
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1100000 );
camera.position.z = 5
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// lumières
scene.add(new THREE.AmbientLight(0xd2b48c, 5))

const point = new THREE.PointLight(0xff8888, 12)
point.position.set(0, 2, 0)
point.castShadow = true
camera.add(point)

const point2 = new THREE.PointLight(0x88ff88, 12)
point2.position.set(0, -2, 0)
point2.castShadow = true
camera.add(point2)

const point3 = new THREE.PointLight(0x8888ff, 12)
point3.position.set(2, 0, 0)
point3.castShadow = true
camera.add(point3)

const point4 = new THREE.PointLight(0xffff88, 12)
point4.position.set(-2, 0, 0)
point4.castShadow = true
camera.add(point4)

// définition des contrôles de la caméra
const controls = new OrbitControls(camera, renderer.domElement);
scene.add(camera)

const material = new THREE.MeshBasicMaterial({ side: THREE.BackSide, map:texture });

let x = 0;
let z = 0;
let dir = 0;
let angles = [
    new THREE.Vector3(5, 0, 0), 
    new THREE.Vector3(5, 0, 5),
    new THREE.Vector3(0, 0, 5),
    new THREE.Vector3(-5, 0, 5),
    new THREE.Vector3(-5, 0, 0),
    new THREE.Vector3(-5, 0, -5),
    new THREE.Vector3(0, 0, -5),
    new THREE.Vector3(5, 0, -5)
]

const axiomArray = [...axiom]
const selectedPattern = [...randomPattern]

let i = 0;
while (axiomArray[i] != undefined) {
    if (axiomArray[i] == "F") {
        selectedPattern.map((letter) => {
            axiomArray.splice(i+1, 0, letter)
        })
        i += selectedPattern.length+1
    } else {
        i += 1
    }
}


var points = [];
points.push(new THREE.Vector3(x, 0, z))

axiomArray.map((letter) => {
    var currentAngle = angles[dir]
    // console.log(dir)
    if (letter == "F") {
        x += currentAngle.x;
        z += currentAngle.z;
        points.push(new THREE.Vector3(x, 0, z));
    } else if (letter == "+") {
        dir = (dir+1).mod(8)
        currentAngle = angles[dir];
    } else if (letter == "*") {
        dir = (dir+2).mod(8)
        currentAngle = angles[dir];
    } else if (letter == "-") {
        dir = (dir-1).mod(8)
        currentAngle = angles[dir];
    } else if (letter == "/") {
        dir = (dir-2).mod(8)
        currentAngle = angles[dir];
    }
})

for (let i = 1; i <= points.length-1; i++) {
    const planeGeometry = new THREE.PlaneGeometry(1, 1)
    const plane = new THREE.Mesh(planeGeometry, material)
    const dx = points[i].x - points[i-1].x
    const dz = points[i].z - points[i-1].z
    const distance = Math.sqrt(dx*dx+dz*dz)
    const angle = Math.atan2(dz, dx)
    plane.scale.set(distance, 1, 1)
    plane.position.set((points[i].x + points[i-1].x)/2, 0, (points[i].z + points[i-1].z)/2)
    plane.rotation.z = angle
    plane.rotation.x = Math.PI/2
    scene.add(plane)
}

// boucle de rendu
function animate() {
    requestAnimationFrame( animate );
controls.update()
    renderer.render( scene, camera );
}

animate();