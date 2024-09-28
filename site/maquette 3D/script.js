// Importer les modules nécessaires de Three.js
import * as THREE from 'three'; // Importer tout de Three.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // Importer le chargeur de fichiers GLTF
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // Importer les contrôles de caméra OrbitControls

// 1. Initialisation de la scène, de la caméra et du renderer

// Création de la scène principale, qui contiendra tous les objets 3D
const scene = new THREE.Scene();

// Création de la caméra avec une vue en perspective.
// Le premier paramètre (75) est le champ de vision (en degrés).
// Le deuxième paramètre est le ratio (proportion) entre la largeur et la hauteur de la fenêtre.
// Les deux derniers paramètres définissent le plan de découpe proche (0.1) et lointain (1000) pour le rendu des objets.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Création du renderer, qui va dessiner la scène dans le canvas HTML.
// Le WebGLRenderer utilise WebGL pour rendre les graphismes 3D dans le navigateur.
const renderer = new THREE.WebGLRenderer();

// 2. Ajout des contrôles de la caméra
// OrbitControls permet de manipuler la caméra avec la souris (orbite autour d'un point)
// 'camera' est la caméra à manipuler, et 'renderer.domElement' est l'élément DOM où les contrôles s'appliquent.
const controls = new OrbitControls(camera, renderer.domElement);

// Définir la taille du renderer en fonction de la taille de la fenêtre.
// Cela garantit que la scène sera rendue en occupant tout l'écran.
renderer.setSize(window.innerWidth, window.innerHeight);

// Ajouter le canvas généré par WebGLRenderer dans le body de la page HTML pour afficher la scène.
document.body.appendChild(renderer.domElement);

// 3. Ajouter une source de lumière
// DirectionalLight simule la lumière du soleil, avec une lumière qui éclaire dans une direction donnée.
// La couleur de la lumière est blanche (0xffffff), et l'intensité de la lumière est définie à 1.
const light = new THREE.DirectionalLight(0xffffff, 1);

// Définir la position de la lumière dans la scène. Ici, elle est placée à (0, 1, 1).
// La méthode 'normalize()' permet de garder la direction de la lumière constante, indépendamment de sa distance.
light.position.set(1, 1, 1).normalize();

// Ajouter la lumière à la scène.
scene.add(light);

// 4. Charger un modèle 3D au format GLTF
// GLTFLoader est utilisé pour charger des modèles 3D au format GLTF (un format standard pour les modèles 3D légers).
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
  gltf.scene.position.set(0, -1, 0);

  // Ajuster l'échelle du modèle. Ici, le modèle est gardé à son échelle d'origine (1, 1, 1).
  // Si le modèle est trop grand ou trop petit, il suffit de changer ces valeurs.
  gltf.scene.scale.set(1, 1, 1);
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
// Cela permet de voir les objets dans la scène qui sont proches de l'origine.
camera.position.z = 1.5;

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
