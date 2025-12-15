<template>
  <div class="combat-pokemon">
    <h1>Combat Pokemon</h1>

    <!-- Contenedor de cartas -->
    <div class="cards-container">
      <div
        v-for="(pokemon, index) in pokemons"
        :key="index"
        class="card"
        :class="{ flipped: selectedCards.includes(index) }"
        @click="selectCard(index)"
      >
        <div class="inner">
          <div class="back">❓</div>
          <div class="front">
            <h3>{{ pokemon.name }}</h3>
            <img :src="pokemon.img" :alt="pokemon.name" />
            <p>Atac: {{ pokemon.attack }}</p>
            <p>Defensa: {{ pokemon.defense }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Resultado -->
    <p class="resultat">{{ resultat }}</p>

    <!-- Botón reiniciar -->
    <button class="reset" :disabled="!canReset" @click="resetCombat">
      Reiniciar combat
    </button>
  </div>
</template>

<script>
export default {
  name: "Combat",
  data() {
    return {
      pokemons: [],
      selectedCards: [],
      resultat: "",
      canReset: false,
    };
  },
  methods: {
    async getRandomPokemons() {
      const arr = [];
      while (arr.length < 10) {
        const id = Math.floor(Math.random() * 151) + 1;
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        arr.push({
          name: data.name,
          img: data.sprites.front_default,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
        });
      }
      this.pokemons = arr;
    },

    selectCard(index) {
      if (this.selectedCards.length === 2) return;
      if (this.selectedCards.includes(index)) return;

      this.selectedCards.push(index);

      if (this.selectedCards.length === 2) {
        setTimeout(this.combat, 600);
      }
    },

    combat() {
      const c1 = this.pokemons[this.selectedCards[0]];
      const c2 = this.pokemons[this.selectedCards[1]];

      if (c1.attack > c2.defense) {
        this.resultat = `${c1.name} ataca i guanya a ${c2.name}!`;
      } else {
        this.resultat = `${c1.name} ataca i perd contra ${c2.name}!`;
      }

      this.canReset = true;
    },

    resetCombat() {
      this.selectedCards = [];
      this.resultat = "";
      this.canReset = false;
      this.getRandomPokemons();
    },
  },
  mounted() {
    this.getRandomPokemons();
  },
};
</script>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.card {
  width: 120px;
  height: 160px;
  perspective: 600px;
  cursor: pointer;
}
.card .inner {
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  position: relative;
}
.card.flipped .inner {
  transform: rotateY(180deg);
}
.back,
.front {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.front {
  transform: rotateY(180deg);
}
.resultat {
  margin-top: 10px;
  font-weight: bold;
}
.reset {
  margin-top: 10px;
  padding: 5px 10px;
}
</style>
