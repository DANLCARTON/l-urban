import * as THREE from "three"
import { OrbitControls } from 'OrbitControls'; // importation de l'addon Orbit Controls pour la gestion de la caméra
import { TrackballControls } from 'TrackballControls'; // importation de l'addon Orbit Controls pour la gestion de la caméra

const generateRandomPattern = (array) => {
    const length = Math.ceil(Math.random()*15);
    var randomPattern = ""
    for (let i = 0; i <= length; i++) {
        const letter = Math.floor(Math.random()*8)
        randomPattern += array[letter]
    }
    return randomPattern
}

const generateRandomAxiom = () => {
    const array = ["F", "+", "-", "*", "/"]
    const length = Math.ceil(Math.random()*500)
    var randomAxiom = ""
    for (let i = 0; i <= length; i++) {
        const letter = Math.floor(Math.random()*5)
        randomAxiom += array[letter]
    }
    return randomAxiom
}

const draw = () => {
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
}

// AXIOMES ---------------------------------------------------------
const testAxiom = "FFF[+FF-FF]FFFF/FFF[+FF-FF]FFFF/FFF[+FF-FF]FFFF"
// const testAxiom = "F[-F]F[+F]F"
const axiom1 = "F"
const axiom2 = "F-F+*F/F"
const axiomGPT100 = "F*F*F/F/F*F/F/F+F/F/F*F/F/F+F/F/F*F/F/F+F/F/F*F/F/F+F/F/F*F/F/F+F/F/F*F/F/F+F/F/F*F/F/F+F/F/F*F/F/F+"
const axiomGPT200 = "F++--FF+F+FF-FF/FFFF/F/+F-F/F+F/FFF/F+/FF/F/FFF/F/F/F+F/F/F+FFF/F+F/F/FF/F/F+F/F/FFF/F+F/F/FFF/F/F+F/F/F+FFF/F+F/F/FF/F/F+F/F/FFF/F+F/F/FF/F/F+F/F/FFF/F+F/F/FF/F/F+F/F/FFF/F+F/F/FF/F/F+F/F/FFF/F+F/F/F"
const axiomGPT300 = "F+-*F/FF*F+F*-*F/F*FF*+FF*FF-+F*FF/F-F*F*F-FF*F*FF+*F-FF/F+F/FF-F/F-FF*F-FF/F-FF-F-FF/F*F/FF/F*F+F/FF*F-F*FF+F*FF/FF*F/FF+FF/FF*F*F*FF/F*F/FF/FF+FF/F/F-F/F-F-FF+F+F/F*FF/FF/F*F/FF*F/FF/F*F/FF*F*F/FF+FF/F/F*FF+F/FF*F/FF*F/FF*F/FF/F*F+F/FF*F/F*F+F+F/FF*F/FF*F/FF*F/FF*F/FF*F+F*F/FF/F*F+F+F*F/FF/F*F*FF/"
const axiomGPT400 = "F+FF-FF*F/FF*+FF/F-F*F*FF/F*F/F+FF-FF/FF+F*F/F/F-F/F*FF/F-F*F*F/FF*FF-F/F-F/F*F+FF/F+FF*FF/FF/F*F/F*FF-F*F/F/F*F/FF/F+FF-F/F+F/F/F*FF/FF-F+F/F/FF*F/FF/F*FF*F*F/F*F/F*FF/FF*F*F*F/FF-F/F*F/FF+F/FF/F/F*F/FF/F/F*FF-F/F/F*F/FF/F*F+F/FF/FF+F/F/F*F/FF/F*FF/FF/F+F/F+F/F*F/F/FF/F/F*FF/FF+F*F/F*F/FF*F+F/F*F/F/FF+F/FF/F+F/F/F*F/FF/F/F*F/F+F/FF/F*FF-F/F/F+F/F/F*F/F+F+F/FF+F/FF*F+F+F/FF/F+F/FF/FF*F+F+F/FF/F*F/"
const axiomGPT500 = "FF+--*FF+*F-FF*F/FF+*FF+FF/FF+FF*F/FF*FF+F-FF*F/F/F/F/F/F/F/FF*F/FF*FF+F/F/F/FF+*F/F/F*FF/F/F/F/F/FF+F*FF/FF*F/F/F/F/F/F/FF/F/FF/F/F/FF+F/FF/F/F/FF*F/F/F/F/FF+*FF/FF/FF/F/F/F/F/FF*F/F/FF/FF/F/FF+*FF+F+F/FF/F/F/F/F/F/F/F/FF/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F/F"
const axiomGPT852 = "F*+*-*F/+F+F-FFF+FF/F*-*+F+F*+F+*F*-*+F-F*-*F+F*-*+F*+FF/+F/F-+*F++F/F-+FF-F/FF-F/FF/F+F/FF/F-F/FF/+F-F+*F*+F-F/FF/F-+FF*-*+F/+F/+*F-*F/F+FF/+F+F/+F/F+F*+FF/F-+*F/F-F/+F+F/F-F/FF*+FF/F-+FF/F+F-+*F-F*-*F-F+F/F*-*F/F+F/+F/FF+F/FF/F*-*F/+F/+F/F+F*+FF/+F+F/+F/F+F*+FF/F-+*F/F-F/+F+F/F-F/FF*+FF/F-+FF/F+F-+*F-F*-*F-F+F/F*-*F/F+F/+F/FF+F/FF/F*-*F/+F/+F/F+F*+FF/+F+F/+F/F+F*+FF/F-+*F/F-F/+F+F/F-F/FF*+FF/F-+FF/F+F-+*F-F*-*F-F+F/F*-*F/F+F/+F/FF+F/FF/F*-*F/+F/+F/F+F*+FF/+F+F/+F/F+F*+FF/F-+*F/F-F/+F+F/F-F/FF*+FF/F-+FF/F+F-+*F-F*-*F-F+F/F*-*F/F+F/+F/FF+F/FF/F*-*F/+F/+F/F+F*+FF/+F+F/+F/F+F*+FF/F-+*F/F-F/+F+F/F-F/FF*+FF/F-+FF/F+F-+*F-F*-*F-F+F/F*-*F/F+F/+F/FF+F/FF/F*-*F/+F/+F/F+F*+FF/+F+F/+F/F+F*+FF/F-+*F/F-F/+F+F/F-F/FF*+FF/F-+FF/F+F-+*F-F*-*F-F+F/F*-*F/F+F/+F/FF+F/FF/F*-*F/+F/+F/F+F*+FF/+F+F/+F/F+F*+FF/F-+*F/F-F/+F+F/F-F/FF*+FF/F-+FF/F+F-+*F-F*-*F-F+F/F*-*F/F+F/+F/FF+F/FF/F*-*F/+F/+F/F+F*+FF/+F+F/+F/F+F*+FF/F-+*F/F-F/+F+F/F-F/FF*+FF/F-+FF/F+F-+*F-F*-*F-F+F/F*-*F/F+F/+F/FF+F/FF/F*-*F/+F/+F/F+F*+FF/+F+F/+F/F+F*+FF/F-+*F/F-F/+F+F/F-F/FF*+FF/F-+FF/F+F-+"
const axiomBard100 = "+F++F++F*F+F-**/F-F-F*F++F-**F+*F*-F+**F--F-F+*++F++F-F-F-FF++F+F*-F-*FF-F**F+F-F+*F-**F-FF-F**F--FF"
const axiomBard200 = "---F****+/F+F/*///+FF/F++**//++*///+*****FFF-+/--*F-*-F--*--++FF++*F+FF-+/+*+/+F+-++*/FFF/++F/-/-+/*F+/F*/F-/F+*+*+-*+F-F//-**F/F+F++F--*/***+--F+F//+//*/--+FF-//+F--+**F-/++-F*F/--/F+FF--FF-+*-F--/FF"
const axiomBard300 = "F+/F+-+*/++F-/*+-+F*FF*F++**--F+/F+F+FF/F+F/+**-+-+F+FF++F+**F-F+*-F+F+-*/F+F+-*/F-F/+F+/F+F++*F++F+-FF+F+F*-*/F++/F+F+F+F/-F+F+F*-F+F+-*/F+F+-*/F-F/+F+/F+F++*F++F+-FF+F+F*-*/F++/F+F+F+F/-F+F+F*-F+F+-*/F+F+-*/F-F/+F+/F+F++*F++F+-FF+F+F*-*/F++/F+F+F+F/-F+F+F*-F+F+-*/F+F+-*/F-F/+F+/F+F++*F++F+-FF+F+F*"
const axiomBard400 = "/+F+/++*-F-/F---/--//+//-F-F-/---//+F++F**/F-/F/F**F+/+++-FF-F++-/-/F+/F+FFF+///F/+-+FF/+*-/FF-F-/FF+///-+F/**+/F-++/F++/-FF-+-/-F/--F/+//+F-+F+/+-///++/F+F**/+F--/--+**//++FFFFF-+-///-F/-F+--+F--/F---/+//FFFFF+//+/F-+F++F+F-+F+F-+/FF+F++/-++/+/F//F++++-F-//FF/F-FFF+/F/FF-F/F-+-+F//+FF/+*-++-+/+F-F-/++F/---+--++-+-F+F-F-F/-/F+/+--+-+-*F+-/-++//FF///-F+++//-+/+-F-----+FF/-F/+F-FF+FF+-++/F+/-FF-/F*/"
const axiomBard500 = "*F+/-*/++//*-**++*F/F**/-++-+/F/+/++F/-+///FF-//+F/+/-++F+**--F/+**/-F/+/FF*-/-F-FF*--*-/F--//F-F*-+/+*-F-F**/F-*+F-F///---/-F*-+*-//+-F--F--/F/-/*-+*+**/*-F-/++F/*F*FF+-FF++**/*/*-*/++/+/--/F+-+***-*+-/F****-*/F**F*-*F-F-*/+*F*+-*F+-F+F+F*F-+*+**/-**-F-*-///-F/-*/*/FFFF-+FFF//F+-F--FF**+++-*++*/+*//F*+-+/*-+/+-+F+//F//FFF+-FF/+---F/+F*/F+-+/FF+---F**F-///*//+-+++**F*F/F-***//-*-F+**+*FF*+F*FF+-F/---FF/+*F+-F-F-+/+*FF*//+-*F-/FFF-+--/F/FF--F/F*F/-*+**+*++/F/*/+F/*/-*F+*/-F+-FF*/-/*+----F---***F-"
const randomAxiom = generateRandomAxiom();
// -----------------------------------------------------------------

// PATTERNS --------------------------------------------------------
const patternF1 = ""
const patternF2 = "F+F-F-F+F"
const patternF3 = "F*F*F*F*F*F/F"
const patternF4 = "F-F*F-F"
const patternF5 = "F/F**FF**F/F/F"
const patternF6 = "F/FF*F**F/F*F*F**F/FF*F"
const randomPatternF = generateRandomPattern(["F", "F", "F", "F", "+", "-", "*", "/"])

const patternPlus1 = ""
const randomPatternPlus = generateRandomPattern(["F", "+", "+", "+", "+", "-", "*", "/"])

const patternMinus1 = ""
const randomPatternMinus = generateRandomPattern(["F", "+", "-", "-", "-", "-", "*", "/"])

const patternTimes1 = ""
const randomPatternTimes = generateRandomPattern(["F", "+", "-", "*", "*", "*", "*", "/"])

const patternDiv1 = ""
const randomPatternDiv = generateRandomPattern(["F", "+", "-", "*", "/", "/", "/", "/"])
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

const axiomArray = [...testAxiom]
const selectedPatternF = [...patternF1]
const selectedPatternPlus = [...patternPlus1]
const selectedPatternMinus = [...patternMinus1]
const selectedPatternTimes = [...patternTimes1]
const selectedPatternDiv = [...patternDiv1]

console.log("length", axiomArray.length)
console.log("selectedPatternF", selectedPatternF)
console.log("selectedPatternPlus", selectedPatternPlus)
console.log("selectedPatternMinus", selectedPatternMinus)
console.log("selectedPatternTimes", selectedPatternTimes)
console.log("selectedPatternDiv", selectedPatternDiv)

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