const cardsContainer = document.getElementById("cardsContainer");
const resultat = document.getElementById("resultat");
const resetBtn = document.getElementById("reset");

let selectedCards = [];

async function getRandomPokemons() {
    const arr = [];

    while (arr.length < 10) {
        const id = Math.floor(Math.random() * 151) + 1;
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        arr.push({
            name: data.name,
            img: data.sprites.front_default,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat
        });
    }
    return arr;
}

function createCard(pokemon, index) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = pokemon.name;
    card.dataset.attack = pokemon.attack;
    card.dataset.defense = pokemon.defense;

    card.innerHTML = `
        <div class="inner">
            <div class="back">❓</div>
            <div class="front">
                <h3>${pokemon.name}</h3>
                <img src="${pokemon.img}">
                <p>Atac: ${pokemon.attack}</p>
                <p>Defensa: ${pokemon.defense}</p>
            </div>
        </div>
    `;

    card.addEventListener("click", () => selectCard(card));
    return card;
}

function selectCard(card) {
    if (selectedCards.length === 2) return;
    if (card.classList.contains("flipped")) return;

    card.classList.add("flipped");
    selectedCards.push(card);

    if (selectedCards.length === 2) {
        setTimeout(combat, 600);
    }
}

function combat() {
    const c1 = selectedCards[0];
    const c2 = selectedCards[1];

    const name1 = c1.dataset.name;
    const name2 = c2.dataset.name;

    const atk = parseInt(c1.dataset.attack);
    const def = parseInt(c2.dataset.defense);

    if (atk > def) {
        resultat.textContent = `${name1} ataca i guanya a ${name2}!`;
    } else {
        resultat.textContent = `${name1} ataca i perd contra ${name2}!`;
    }

    resetBtn.disabled = false;
}

function resetCombat() {
    selectedCards = [];
    resultat.textContent = "";
    cardsContainer.innerHTML = "";
    resetBtn.disabled = true;
    init();
}

resetBtn.addEventListener("click", resetCombat);

async function init() {
    const pokemons = await getRandomPokemons();
    pokemons.forEach((p, i) => cardsContainer.appendChild(createCard(p, i)));
}

init();