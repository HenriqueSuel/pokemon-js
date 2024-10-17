async function onMount() {
  const response = await fetch("https://pokeapi.co/api/v2/type/");
  const types = await response.json();

  const tagSelect = document.getElementById("listTypes");

  types.results.forEach((type) => {
    const option = document.createElement("option");
    option.value = type.url;
    option.text = type.name;

    tagSelect.append(option);
  });
}

function carregarImagem(imagens) {
  let image = "";
  for (const iterator in imagens) {
    if (typeof imagens[iterator] === "string") {
      image += `
      <div class="carousel-item ${!image ? "active" : ""}">
            <img src="${
              imagens[iterator]
            }" class="d-block w-100" alt="${iterator}" />
          </div>
      `;
    }
  }

  return image;
}

async function tipoEscolhido(event) {
  const valorDoSelect = event.target.value;

  const response = await fetch(valorDoSelect);
  const pokemons = await response.json();

  const lista = document.getElementById("lista");

  lista.innerHTML = null;

  pokemons.pokemon.forEach(async (item) => {
    const response = await fetch(item.pokemon.url);

    const pokemon = await response.json();

    const container = document.createElement("div");

    console.log(item.pokemon.name, pokemon.sprites);

    container.innerHTML = `
    <div class="card" style="width: 18rem;">
        
      <div id="carouselExample-${item.pokemon.name}" class="carousel slide">
          <div class="carousel-inner">
             ${carregarImagem(pokemon.sprites)}
          </div>
      </div>

      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample-${item.pokemon.name}"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample-${item.pokemon.name}"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
        <div class="card-body">
          <h5 class="card-title">${item.pokemon.name}</h5>
        </div>
     </div>
    
    `;

    lista.append(container);
  });
}

onMount();