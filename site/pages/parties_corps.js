// target la div avec la classe "apropos"
const aproposDiv = document.querySelector('#apropos');

// céréation des éléments html !
const title = document.createElement('h3');
title.textContent = 'Avant-propos';

const paragraph = document.createElement('p');
paragraph.innerHTML = '<strong>Il est important de, tout d\'abord, savoir qu\'il existe une analyse des blessures et des chocs traumatiques qui indiquent les besoins d\'une intervention immédiate</strong>. <br>Certains éléments doivent immédiatement attirer votre attention car ils signalent potentiellement une situation grave, nécessitant une prise en charge rapide. Voici quelques exemples :';

const list = document.createElement('ul');

const items = [ //création tableau avec objet conseil de chat GPT cela de manipuler les obets de la liste avec des eachs et on peut interchanger les objets pour changer ordre de list
    { text: ' (même brève)  Signe d’un traumatisme crânien potentiellement grave.', strong: 'Perte de conscience' },
    { text: ' Cela peut être signe de traumatisme thoracique ou de choc.', strong: 'Difficultés respiratoires' },
    { text: ' Cela peut nécessiter une immobilisation rapide et une prise en charge chirurgicale.', strong: 'Fracture visible ou déformation' },
    { text: ' Un saignement abondant doit être traité rapidement pour éviter un choc hémorragique.', strong: 'Hémorragie sévère' },
    { text: ' Indique potentiellement une fracture ou un autre dommage interne significatif.', strong: 'Douleur intense et résistante aux mouvements' }
];

// items de la liste
items.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.strong}</strong> : ${item.text}`;
    list.appendChild(li);
});

// pousse les elements crées 
aproposDiv.appendChild(title);
aproposDiv.appendChild(paragraph);
aproposDiv.appendChild(list);

// css des différents elements crées

aproposDiv.style.display ='flex';
aproposDiv.style.flexDirection = 'column';
aproposDiv.style.alignItem = "center";
aproposDiv.style.marginBottom = "5%";
aproposDiv.style.marginTop = "5%";
aproposDiv.style.borderBottom = '1px solid rgb(206, 206, 206)';
aproposDiv.style.borderTop = '1px solid rgb(206, 206, 206)';
//aproposDiv.style.textAlign ='center';

title.style.fontSize = '24px';
title.style.fontWeight = 'bold';
title.style.color = '#333';
title.style.textAlign = 'center';
title.style.margin = "50px";
title.style.color = "#b92828";

paragraph.style.fontSize = '16px';
paragraph.style.lineHeight = '1.5';
paragraph.style.color = '#555';
paragraph.style.textAlign = 'center';
paragraph.style.marginBottom ='2%'
paragraph.style.textAlign = 'justify';
paragraph.style.paddingLeft = '20%';

list.style.listStyleType = 'circle'; //'disc' de base valeur des puces de la list
list.style.marginLeft = '23%';
list.style.marginBottom = '5%';


const listItems = list.querySelectorAll('li');
listItems.forEach(item => {
    item.style.marginBottom = '10px';
    item.style.fontSize = '16px';
    item.style.color = '#444';
});

// Stylisation des <strong> dans le texte
const strongElements = paragraph.querySelectorAll('strong');
strongElements.forEach(strong => {
    strong.style.color = '#000';
    strong.style.fontWeight = '600';
});
