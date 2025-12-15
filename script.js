document.addEventListener("DOMContentLoaded", () => {

    const pokemonContainer = document.getElementById("pokemon-container");
    const generateButton = document.getElementById("generate-pokemon");
    const backToListButton = document.getElementById("back-to-list");
    const filterInput = document.getElementById("pokemon-filter");
    
    function getRandomPokemonIds() {
        const ids = [];
        while (ids.length < 10) {
            const randomId = Math.floor(Math.random() * 1000) + 1;
            if (!ids.includes(randomId)) ids.push(randomId);
        }
        return ids;
    }
    
    function getPokemonIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("pokeID");
    }
    
    function fetchPokemonData(id) {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(response => response.json())
            .then(data => ({
                id: data.id,
                name: data.name,
                attack: data.stats.find(stat => stat.stat.name === "attack").base_stat,
                defense: data.stats.find(stat => stat.stat.name === "defense").base_stat,
                image: data.sprites.front_default,
                types: data.types.map(type => type.type.name),
            }))
            .catch(error => console.error("Error al carregar el Pokémon:", error));
    }
    
    function createPokemonCard(pokemon) {
        const card = document.createElement("div");
        card.classList.add("pokemon-card");

        card.innerHTML = `
            <img src="${pokemon.image}" alt="${pokemon.name}" class="pokemon-img">
            <div class="pokemon-name">${pokemon.name}</div>
            <div class="pokemon-stat">Atac: ${pokemon.attack}</div>
            <div class="pokemon-stat">Defensa: ${pokemon.defense}</div>
            <div class="pokemon-type">
                ${pokemon.types.map(type => `<span class="type-${type}">${type}</span>`).join("")}
            </div>`;
        
        card.addEventListener("click", () => {
            window.location.href = `index.html?pokeID=${pokemon.id}`;
        });

        pokemonContainer.appendChild(card);
    }
    
    function createPokemonDetail(pokemon) {
        pokemonContainer.innerHTML = `
            <div class="pokemon-detail">
                <h2>${pokemon.name}</h2>
                <img src="${pokemon.image}" alt="${pokemon.name}" class="pokemon-img">
                <div class="pokemon-stat">Atac: ${pokemon.attack}</div>
                <div class="pokemon-stat">Defensa: ${pokemon.defense}</div>
                <div class="pokemon-type">
                    ${pokemon.types.map(type => `<span class="type-${type}">${type}</span>`).join("")}
                </div>
            </div>
        `;

        generateButton.style.display = "none";
        backToListButton.style.display = "inline-block";
        filterInput.style.display = "none"; 
    }
    
    function showPokemonList() {
        pokemonContainer.innerHTML = "";

        const savedPokemonIds = JSON.parse(localStorage.getItem("pokemonIds"));

        if (savedPokemonIds) {
            const orderedIds = [...savedPokemonIds]; 
            
            orderedIds.reduce((p, id) => {
                return p.then(() =>
                    fetchPokemonData(id).then(pokemon => createPokemonCard(pokemon))
                );
            }, Promise.resolve());
        } else {
            const pokemonIds = getRandomPokemonIds();

            pokemonIds.forEach(id => {
                fetchPokemonData(id).then(pokemon => createPokemonCard(pokemon));
            });

            localStorage.setItem("pokemonIds", JSON.stringify(pokemonIds));
        }

        generateButton.style.display = "inline-block";
        backToListButton.style.display = "none";
        filterInput.style.display = "block";  
    }
    
    filterInput.addEventListener("input", () => {
        const filterValue = filterInput.value.toLowerCase();
        const cards = document.querySelectorAll(".pokemon-card");

        cards.forEach(card => {
            const name = card.querySelector(".pokemon-name").textContent.toLowerCase();
            card.style.display = name.includes(filterValue) ? "block" : "none";
        });
    });
    
    const pokemonId = getPokemonIdFromUrl();

    if (pokemonId) {
        fetchPokemonData(pokemonId).then(pokemon => createPokemonDetail(pokemon));
    } else {
        showPokemonList();
    }
    
    generateButton.addEventListener("click", () => {
        const pokemonIds = getRandomPokemonIds();
        pokemonContainer.innerHTML = "";

        pokemonIds.forEach(id => {
            fetchPokemonData(id).then(pokemon => createPokemonCard(pokemon));
        });

        localStorage.setItem("pokemonIds", JSON.stringify(pokemonIds));
    });
    
    backToListButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });
});