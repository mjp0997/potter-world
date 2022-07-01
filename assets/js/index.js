// DOM Elements

const container = document.querySelector('#container');


// Functions

const cardFactory = (name, img, house, birthDate, actor) => {

   // Image
   const image = document.createElement('div');
   image.classList.add('img-container', 'px-md-5', 'c-img', 'align-items-center');
   image.innerHTML = `<img src="${img}" alt="gryffindor">`;
   
   // Content
   const content = document.createElement('div');
   content.classList.add('d-flex', 'flex-column', 'px-md-5', 'py-5', 'c-content');
   content.innerHTML = `
      <p class="fs-1 text-center">${name}</p>

      <div class="d-flex justify-content-between">
         <p>Casa:</p>

         <div class='d-flex'>
            <div class="img-icon me-1">
               <img src="./assets/images/houses/${house}.svg" alt="${house}">
            </div>

            ${house}
         </div>
      </div>

      <div class="d-flex justify-content-between">
         <p>Fec. Nac:</p>

         <p>${birthDate}</p>
      </div>

      <div class="d-flex justify-content-between">
         <p>Actor:</p>

         <p>${actor}</p>
      </div>
   `;

   return [image, content];
}

const getCards = async () => {
   
   const response = await fetch('http://hp-api.herokuapp.com/api/characters');

   const data = await response.json();

   const filtered = data.filter(character => character.image != '' && character.house && character.dateOfBirth != '');

   const shuffled = [...filtered].sort(() => 0.5 - Math.random());

   const characters = shuffled.slice(0, 4);

   const cards = characters.map(char => cardFactory(char.name, char.image, char.house, char.dateOfBirth, char.actor));

   cards.forEach(([image, content]) => {
      container.appendChild(image);
      container.appendChild(content);
   });
}



// Event listeners

window.addEventListener('DOMContentLoaded', getCards);