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
