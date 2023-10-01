import * as THREE from "three"
import { OrbitControls } from 'OrbitControls'; // importation de l'addon Orbit Controls pour la gestion de la caméra
import { TrackballControls } from 'TrackballControls'; // importation de l'addon Orbit Controls pour la gestion de la caméra
import { FlyControls } from 'FlyControls';
import { FirstPersonControls } from 'FirstPersonControls';
import axioms from "./axioms";
import {FRules, plusRules, minusRules, timesRules, divRules} from "./rules.js"

const urlParams = new URLSearchParams(window.location.search)
let URL_AXIOM = urlParams.get("axiom")
let URL_TYPED_AXIOM = urlParams.get("typed-axiom")
let URL_F_RULE = urlParams.get("f-rule")
let URL_TYPED_F_RULE = urlParams.get("typed-f-rule")
let URL_PLUS_RULE = urlParams.get("plus-rule")
let URL_TYPED_PLUS_RULE = urlParams.get("typed-plus-rule")
let URL_MINUS_RULE = urlParams.get("minus-rule")
let URL_TYPED_MINUS_RULE = urlParams.get("typed-minus-rule")
let URL_TIMES_RULE = urlParams.get("times-rule")
let URL_TYPED_TIMES_RULE = urlParams.get("typed-times-rule")
let URL_DIV_RULE = urlParams.get("div-rule")
let URL_TYPED_DIV_RULE = urlParams.get("typed-div-rule")
let URL_ITER = urlParams.get("iter")

const planeGeometry = new THREE.PlaneGeometry(1, 1)
const draw = () => {
    drawSphere("start", points[0])
    for (let i = 1; i <= points.length-1; i++) {
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
    drawSphere("end", points[points.length-1])
}

const StartMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00})
const EndMaterial = new THREE.MeshBasicMaterial({color: 0xff0000})
const SphereGeometry = new THREE.SphereGeometry()

const drawSphere = (moment, pos) => {
    const sphere = new THREE.Mesh(SphereGeometry, moment == "start" ? StartMaterial : EndMaterial)
    sphere.position.set(pos.x, pos.y, pos.z)
    scene.add(sphere)
}

// PATTERNS --------------------------------------------------------

// -----------------------------------------------------------------

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
camera.position.y = 20
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

let axiomArray, selectedPatternF, selectedPatternPlus, selectedPatternMinus, selectedPatternTimes, selectedPatternDiv   

URL_TYPED_AXIOM !== "" ? (axiomArray = [...URL_TYPED_AXIOM]) : (axiomArray = [...axioms[URL_AXIOM]])
URL_TYPED_F_RULE !== "" ? (selectedPatternF = [...URL_TYPED_F_RULE]) : (selectedPatternF = [...FRules[URL_F_RULE]])
URL_TYPED_PLUS_RULE !== "" ? (selectedPatternPlus = [...URL_TYPED_PLUS_RULE]) : (selectedPatternPlus = [...plusRules[URL_PLUS_RULE]])
URL_TYPED_MINUS_RULE !== "" ? (selectedPatternMinus = [...URL_TYPED_MINUS_RULE]) : (selectedPatternMinus = [...minusRules[URL_MINUS_RULE]])
URL_TYPED_TIMES_RULE !== "" ? (selectedPatternTimes = [...URL_TYPED_TIMES_RULE]) : (selectedPatternTimes = [...timesRules[URL_TIMES_RULE]])
URL_TYPED_DIV_RULE !== "" ? (selectedPatternDiv = [...URL_TYPED_DIV_RULE]) : (selectedPatternDiv = [...divRules[URL_DIV_RULE]])

console.log("length", axiomArray.length)
console.log("axiomArray", axiomArray)
console.log("selectedPatternF", selectedPatternF)
console.log("selectedPatternPlus", selectedPatternPlus)
console.log("selectedPatternMinus", selectedPatternMinus)
console.log("selectedPatternTimes", selectedPatternTimes)
console.log("selectedPatternDiv", selectedPatternDiv)



const applyRules = (axiomArray) => {
    let i = 0;
    while (axiomArray[i] != undefined) {
        if (axiomArray[i] == "F") {
            selectedPatternF.map((letter) => {
                axiomArray.splice(i+1, 0, letter)
            })
            i += selectedPatternF.length+1
        }  else if (axiomArray[i] == "+") {
            selectedPatternPlus.map((letter) => {
                axiomArray.splice(i+1, 0, letter)
            })
            i += selectedPatternPlus.length+1
        } else if (axiomArray[i] == "-") {
            selectedPatternMinus.map((letter) => {
                axiomArray.splice(i+1, 0, letter)
            })
            i += selectedPatternMinus.length+1
        } else if (axiomArray[i] == '*') {
            selectedPatternTimes.map((letter) => {
                axiomArray.splice(i+1, 0, letter)
            })
            i += selectedPatternTimes.length+1
        } else if (axiomArray[i] == "/") {
            selectedPatternDiv.map((letter) => {
                axiomArray.splice(i+1, 0, letter)
            })
            i += selectedPatternDiv.length+1
        } else {
            i += 1
        }
    }
    return axiomArray   
}

const iter = URL_ITER
for (let i = 0; i <= iter-1; i++) {
    axiomArray = applyRules(axiomArray)
}

console.log(axiomArray)



var points = [];
points.push(new THREE.Vector3(x, 0, z))
var savedPos = new THREE.Vector3(0, 0, 0)
var savedDir = dir
var p = 0;

axiomArray.map((letter) => {
    var currentAngle = angles[dir]
    // console.log(dir)
    if (letter == "F") {
        x += currentAngle.x;
        z += currentAngle.z;
        p += 1
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
    } else if (letter == "[") {
        console.log("[", "points", points, "points p", points[p])
        savedPos = points[p]
        savedDir = dir
    } else if (letter == "]") {
        console.log("]", "saved pos", savedPos, "points", points)
        draw()
        x = savedPos.x
        z = savedPos.z
        dir = savedDir
        points = []
        p = 0
        points.push(new THREE.Vector3(x, 0, z))
    }
})
console.log(points)
draw()





// boucle de rendu
function animate() {
    requestAnimationFrame( animate );
    controls.update()
    renderer.render( scene, camera );
}

animate();