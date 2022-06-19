// Pegando cada banda do api e distrbuindo numa lista para realizar a busca. tela 1.
const result = document.getElementById("result");
const filter = document.getElementById("filter");
const listItems = [];

getData();

filter.addEventListener("input", (e) => filterData(e.target.value));

async function getData() {
  const res = await fetch(
    "https://iws-brazil-labs-iws-recruiting-bands.iwsbrazil.io/api/bands"
  );

  const data = await res.json();

  console.log(data);

  // Clear results
  result.innerHTML = "";

  data.forEach((band) => {
    const li = document.createElement("li");
    li.classList.add("flex");
    li.classList.add("p-5");

    listItems.push(li);

    //  na div ali, não está funcionando margin de 3 pra cima. ml-4 não funciona, nem 5. Não entendo por quê.
    li.innerHTML = `
      <img class="h-12 w-12 object-contain rounded-full" src="${band.image}" alt="${band.name}">
      <div class="ml-3">
         <h4 class="font-semibold text-gray-600">${band.name}</h4>
         <p class="font-light text-gray-500 text-sm -mt-1">${band.numPlays}</p>
      </div>
    `;
    result.appendChild(li);
  });
}

// tive que criar a classe hide manualmente porque utilizando a Hidden do tailwind não funciona.
function filterData(searchTerm) {
  listItems.forEach((band) => {
    if (band.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
      band.classList.remove("hide");
      band.classList.add("flex");
    } else {
      band.classList.remove("flex");
      band.classList.add("hide");
    }
  });
}

// /Pegando cada banda do api e distrbuindo numa lista para realizar a busca. tela 1.

// Tentando criar o layout da pagina 2. Alinhando as imagens:

// function imgBefore() {
//   let p = document.createElement("p");
//   const complicada = document.getElementById("complicada");
//   complicada.after(p);

//   p.classList.add("margin-esquerda");

//   p.innerHTML = ` 465`;
// }

// function imgAfter() {
//   let p = document.createElement("p");
//   const complicada = document.getElementById("complicada");
//   complicada.after(p);

//   p.classList.add("margin-direita");

//   p.innerHTML = ` ola pessoal 123`;
// }

// imgBefore();
// imgAfter();

// Não deu certo inserir o layout pelo javascript.

// Fetching the Biography

const cardBody = document.getElementById("card-body");
const bandBio = [];
const bioBtn = [];

getBio();

async function getBio() {
  const res = await fetch(
    "https://iws-brazil-labs-iws-recruiting-bands.iwsbrazil.io/api/bands"
  );

  const bio = await res.json();

  console.log(bio);

  // Clear band biography
  cardBody.innerHTML = "";

  bio.forEach((band) => {
    const paragraph = document.createElement("p");
    paragraph.classList.add("p-6");
    paragraph.classList.add("text-justify");
    paragraph.classList.add("overflow-hidden");
    paragraph.classList.add("h-28");
    paragraph.classList.add("text-gradient");
    paragraph.classList.add("text-justify");
    paragraph.setAttribute("id", "band-description");

    bandBio.push(paragraph);

    paragraph.innerHTML = `${band.biography}`;
    cardBody.appendChild(paragraph);

    const btn = document.createElement("button");
    btn.classList.add("font-bold");
    btn.classList.add("text-4xl");
    btn.classList.add("text-center");
    btn.classList.add("p-6");
    btn.classList.add("ml-auto");
    btn.classList.add("mr-auto");
    btn.classList.add("block");
    btn.setAttribute("id", "read-more");

    bioBtn.push(btn);
    btn.innerHTML = "+";
    cardBody.appendChild(btn);
  });
}

// cardBody.innerHTML = `

// <p
// class="p-6 text-justify overflow-hidden h-28 text-gradient"
// id="band-description"
// >
// ${band.biography}
// </p>
// <button
// class="font-bold text-4xl text-center p-6 ml-auto mr-auto block"
// id="read-more"
// >
// +
// </button>
// `

// READ MORE BUTTON (+) tela 2.

const readMore = document.getElementById("read-more");
const bandDescription = document.getElementById("band-description");

readMore.addEventListener("click", toggleHeight);

function toggleHeight() {
  bandDescription.classList.toggle("h-28");
}

// removendo o text-gradient

readMore.addEventListener("click", removeGradient);

function removeGradient() {
  bandDescription.classList.toggle("text-gradient");
}

// Dúvida sobre o READ MORE BUTTON:

// E se eu quiser chamar mais de uma função com o mesmo click? I mean... call two or more functions from the same click event

// Na minha cabeça eu poderia intercalar as funções ao adicionar o eventlistener. exemplo:

// function addBg() {
//   bandDescription.classList.add("bg-blue-600");
// }
// readMore.addEventListener("click", toggleHeight, addBg);
// Mas isso aqui não funciona!

// Uma solução seria criar uma função pra chamar todas as outras:
// readMore.addEventListener("click", chamaTudo);

// function chamaTudo() {
//   toggleHeight();
//   addBg();
// }

// /READ MORE BUTTON (+)
