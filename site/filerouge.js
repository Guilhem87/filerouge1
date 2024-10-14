//sticky navbar elle reste sur le haut de la page une fois que l'on navigue 
window.onscroll = function() {myFunction()};

const header = document.getElementById("header");
const navbar = document.getElementById("navbar");
const sticky = header.offsetHeight;

function myFunction() {
    if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
    } else {
    navbar.classList.remove("sticky");
    }
}


// Importer les modules nécessaires de Three.js
import * as THREE from 'three'; // Importer tout de Three.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // Importer le chargeur de fichiers GLTF
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // Importer les contrôles de caméra OrbitControls

// Initialisation de la scène, de la caméra et du renderer

// Création de la scène principale, qui contiendra tous les objets 3D
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x021330); // fond de la scene darkdarkblue


// Création de la caméra avec une vue en perspective.
// Le premier paramètre (75) est le champ de vision (en degrés).
// Le deuxième paramètre est le ratio (proportion) entre la largeur et la hauteur de la fenêtre.
// Les deux derniers paramètres définissent le plan de découpe proche (0.1) et lointain (1000) pour le rendu des objets.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//control.target.ser (x, y, z );

// Création du renderer, qui va dessiner la scène dans le canvas HTML.
// Le WebGLRenderer utilise WebGL pour rendre les graphismes 3D dans le navigateur.
const renderer = new THREE.WebGLRenderer();

// 2. Ajout des contrôles de la caméra
// OrbitControls permet de manipuler la caméra avec la souris (orbite autour d'un point)
// 'camera' est la caméra à manipuler, et 'renderer.domElement' est l'élément DOM où les contrôles s'appliquent.
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 3;

// Définir la taille du renderer en fonction de la taille de la fenêtre.
// Cela garantit que la scène sera rendue en occupant tout l'écran.
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.width = '100%';  // Le renderer occupe 100% de son conteneur
renderer.domElement.style.height = '100%';  // occupe 100% de la hauteur de son conteneur ( peut etre changé en auto pour garder les bonne dimention)


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
// Ajouter le canvas généré par WebGLRenderer dans la div img3d de la page HTML pour afficher la scène.
// Trouver la div avec l'ID 'img3d' et ajouter le canvas dedans
const img3dDiv = document.getElementById('img3d');
img3dDiv.appendChild(renderer.domElement);
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++//

// Ajouter une source de lumière
// DirectionalLight simule la lumière du soleil, avec une lumière qui éclaire dans une direction donnée.
// La couleur de la lumière est blanche (0xffffff), et l'intensité de la lumière est définie à 1.
const light = new THREE.DirectionalLight(0xffffff, 1);

// Créer une lumière ambiante avec une intensité de 0.5
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Couleur blanche et intensité à 0.4
scene.add(ambientLight);

// Définir la position de la lumière dans la scène. Ici, elle est placée à (0, 1, 1).
// La méthode 'normalize()' permet de garder la direction de la lumière constante, indépendamment de sa distance.
light.position.set(1, 1, 1).normalize();

// Ajouter la lumière à la scène.
scene.add(light);
scene.add(ambientLight);

//Charger un modèle 3D au format GLTF
//GLTFLoader est utilisé pour charger des modèles 3D au format GLTF (un format standard pour les modèles 3D légers).
const loader = new GLTFLoader();

// Charger le modèle à partir du fichier 'asset/scene.gltf'.
// La fonction prend trois paramètres :
// - Le premier est une fonction appelée une fois que le fichier est chargé avec succès.
// - Le deuxième est une fonction de progression, utilisée pour afficher l'avancement du chargement.
// - Le troisième est une fonction de gestion des erreurs en cas de problème lors du chargement.
loader.load('asset/scene.gltf', (gltf) => {
  // Ajouter le modèle 3D (contenu dans 'gltf.scene') à la scène.
  scene.add(gltf.scene);
  // On ajoute à nouveau la lumière à la scène, bien qu'elle soit déjà présente (cela pourrait être une duplication inutile).
  scene.add(light);
  // Ajuster la position du modèle pour qu'il soit bien placé dans la scène.
  // Ici, on le déplace légèrement vers le bas sur l'axe Y avec 'set(0, -1, 0)'.
  gltf.scene.position.set(0, -0.9, 0.32); //TRES IMPORTANT Je MODIFIE LEMPLACEMENT DU MANNEQUIN POUR QUIL SOIT SUR LAXE DE ROTATION DE LA CAMERA Z=0.35 et la profondeur de l'axe ! (x,y,z)

  
  // Ajuster l'échelle du modèle. Ici, le modèle est gardé à son échelle d'origine (1, 1, 1).
  // Si le modèle est trop grand ou trop petit, il suffit de changer ces valeurs.
  gltf.scene.scale.set(0.9, 0.9, 0.9);
},
// Fonction appelée pendant le chargement pour afficher l'avancement en pourcentage.
// 'xhr' contient des informations sur la progression du chargement.
(xhr) => {
  console.log((xhr.loaded / xhr.total * 100) + '% chargé'); // Affiche le pourcentage chargé dans la console.
},
// Fonction appelée en cas d'erreur lors du chargement du fichier GLTF.
(error) => {
  console.error('Erreur lors du chargement du fichier GLTF:', error); // Affiche l'erreur dans la console.
});

// 5. Positionner la caméra
// On place la caméra à une distance de 5 unités de la scène sur l'axe Z.

camera.position.z= 2;// .z = 1.2 Cela permet de voir les objets dans la scène qui sont proches de l'origine.
camera.position.x= 0;
camera.position.y= 0;
camera.lookAt(scene.position);

// 6. Fonction d'animation et de rendu
// La fonction 'animate' est appelée en boucle pour rendre la scène continuellement à chaque frame.
function animate() {
  // Demander une nouvelle frame d'animation, et appeler à nouveau 'animate' pour la prochaine frame.
  requestAnimationFrame(animate);
  // Rendre la scène et la caméra à chaque frame.
  // Cela dessine tous les objets et les met à jour en fonction des interactions.
  renderer.render(scene, camera);
}
// Démarrer l'animation en appelant la fonction 'animate' pour la première fois.
animate();


//==============ZONE HIGHLIGHT=========================0.02// 

const coudeZone = new THREE.SphereGeometry(0.01, 32, 32); // Dimensions de la sphere
const material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: false, /*visible: false*/});
const coudeMesh = new THREE.Mesh(coudeZone, material);

scene.add(coudeMesh); // on push la zone sur le shema 3D

coudeMesh.position.set(0.35, 0.25, -0.045); // Positionne la boîte sur le coude


function createBodyPart(partName, color, position) {  //fonction faite pour créer des sphere qui permettront de cibler une zone 
  const geometry = new THREE.SphereGeometry(0.01, 32, 32); // Taille et forme identiques pour toutes les parties
  const material = new THREE.MeshBasicMaterial({ color: color, wireframe: false });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(position.x, position.y, position.z);

  //mesh.visible = false; //masque la sphère de base.
  scene.add(mesh);
  return mesh;
}

 // création d'une zone pour le genoux avec la fonction createBodyPart
const genoux = createBodyPart('genoux', 0x00ff00, {x:0.14, y: -0.5, z:0.060}); // introduction ds une constante .
const trapeze = createBodyPart('trapeze', 0x00ff00, {x:0.07, y:0.35, z:-0.075});
const basDos = createBodyPart('basDos', 0x00ff00, {x:0, y:0.1, z:-0.045});
const fesse = createBodyPart('fesse', 0x00ff00, {x:-0.12, y:-0.15, z:-0.065});
const epaule = createBodyPart('epaule', 0x00ff00, {x:-0.24, y:0.42, z:-0.005});
const biceps = createBodyPart('biceps', 0x00ff00, {x:-0.18, y:0.35, z:0.058});
const flechiHanche = createBodyPart('flechiHanche', 0x00ff00, {x:0.10, y:-0.09, z:0.14});
const  abdos = createBodyPart('abdos', 0x00ff00, {x:0, y:0, z:0.17});
const  cheville = createBodyPart('cheville', 0x00ff00, {x:-0.22, y:-0.8, z:0.004});
const  quadri = createBodyPart('abdos', 0x00ff00, {x:-0.14, y:-0.36, z:0.10});
const voutePied = createBodyPart('voutePied', 0x00ff00, {x:0.20, y: -0.9, z:0.010});

// Variables pour le raycaster et la souris
const raycaster = new THREE.Raycaster(); 
const mouse = new THREE.Vector2(); 

// Écouteur d'événement pour détecter la position de la souris
window.addEventListener('mousemove', (event) => {
 // Récupère les coordonnées de la souris en fonction des ***dimensions*** du canvas
  const canvasBounds = renderer.domElement.getBoundingClientRect();
 // Calculer les coordonnées normalisées de la souris (-1 à 1) en fonction du canvas
 mouse.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
 mouse.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;
// Met à jour le raycaster en fonction de la caméra et de la position de la souris
    raycaster.setFromCamera(mouse, camera);
    
    passeSurZoneetChangeColorTaille(raycaster, coudeMesh, 0xff0000, 0x00ff00);
    passeSurZoneetChangeColorTaille(raycaster, genoux, 0xff0000, 0x00ff00);
    passeSurZoneetChangeColorTaille(raycaster, trapeze, 0xff0000, 0x00ff00);
    passeSurZoneetChangeColorTaille(raycaster, basDos, 0xff0000, 0x00ff00);
    passeSurZoneetChangeColorTaille(raycaster, fesse, 0xff0000, 0x00ff00);
    passeSurZoneetChangeColorTaille(raycaster, epaule, 0xff0000, 0x00ff00);
    passeSurZoneetChangeColorTaille(raycaster, flechiHanche, 0xff0000, 0x00ff00);
    passeSurZoneetChangeColorTaille(raycaster, abdos, 0xff0000, 0x00ff00);
    passeSurZoneetChangeColorTaille(raycaster, cheville, 0xff0000, 0x00ff00);
    passeSurZoneetChangeColorTaille(raycaster, quadri, 0xff0000, 0x00ff00);
    passeSurZoneetChangeColorTaille(raycaster, biceps, 0xff0000, 0x00ff00);
    passeSurZoneetChangeColorTaille(raycaster, voutePied, 0xff0000, 0x00ff00);
});

//cf https://threejs.org/examples/?q=poin#webgl_interactive_points

function passeSurZoneetChangeColorTaille(raycaster, partieCorps, colorIntersect, colorNoIntersect) {
  const intersects = raycaster.intersectObject(partieCorps);
  if (intersects.length > 0) {
    //partieCorps.visible = true; // affichera la sphere au passage de la souris
    partieCorps.scale.set(3, 3, 3); // Augmente la taille de la sphère
    partieCorps.material.color.set(colorIntersect);// Change la couleur en cas d'intersection
  } else {
    //partieCorps.visible = false; // rendra la sphere invisible si la sphere n'est pas dessus
    partieCorps.scale.set(1, 1, 1); // Remet la taille originale
    partieCorps.material.color.set(colorNoIntersect); // Remet la couleur d'origine
  }
};

function envoyerVersLien(partieCorps, url) { window.addEventListener ('click', (event) => {
  const canvasBounds = renderer.domElement.getBoundingClientRect();
  const mouse = new THREE.Vector2();
  mouse.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
  mouse.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(partieCorps);

  if (intersects.length > 0) {
    window.location.href = url;
  }
})};

envoyerVersLien(genoux, './pages/genoux.html');





// renderer.domElement : Cela fait référence à l'élément DOM dans lequel Three.js rend la scène. En général, c'est une balise <canvas> dans ton HTML. Cet élément représente le contexte de rendu pour ton modèle 3D.

// getBoundingClientRect() : C'est une méthode JavaScript native qui renvoie les coordonnées et les dimensions d'un élément par rapport à la fenêtre du navigateur. Elle renvoie un objet avec les propriétés suivantes :
//   top : Distance entre le haut de l'élément et le haut de la fenêtre.
//   left : Distance entre le côté gauche de l'élément et le côté gauche de la fenêtre.
//   width : Largeur de l'élément.
//   height : Hauteur de l'élément.
//   D'autres propriétés comme bottom et right.

// Lorsque tu veux calculer la position de la souris sur ton canvas, tu ne peux pas utiliser directement les coordonnées globales de la souris dans la fenêtre (comme celles de event.clientX et event.clientY), car ces coordonnées sont relatives à la fenêtre du navigateur et non à la position du canvas.

// Or, ton canvas pourrait ne pas occuper tout l'espace de la fenêtre : il pourrait être décalé à droite ou en bas, ou avoir une taille spécifique. C'est là que getBoundingClientRect() devient utile, car il te permet d'adapter les coordonnées de la souris pour tenir compte de la position et de la taille du canvas.
// Exemple pratique :

// Voici ce que fait cette ligne dans ton contexte :

// Récupérer les dimensions du canvas :
//     Suppose que ton canvas n'occupe qu'une partie de la fenêtre, par exemple il commence à 50 pixels du haut et à 100 pixels de la gauche.
// Adapter les coordonnées de la souris :
//     Si tu cliques sur un point de la fenêtre avec event.clientX = 150 et event.clientY = 60, ces coordonnées ne reflètent pas forcément un clic à cet endroit du canvas, car il est décalé par rapport à la fenêtre. Tu dois donc soustraire les marges du canvas (left et top) pour obtenir les vraies coordonnées de la souris à l'intérieur du canvas.
//     Cela te permet de calculer correctement la position de la souris relative au canvas et d'utiliser ces coordonnées pour, par exemple, faire du raycasting ou détecter des interactions dans la scène 3D.