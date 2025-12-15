<template>
  <div class="combat-page">
    <h1>Combat Pokémon</h1>

    <p>Selecciona dos Pokémon para combatir:</p>

    <div class="combat-select">
      <div>
        <label>Pokémon 1:</label>
        <select v-model="pokemon1">
          <option disabled value="">Selecciona un Pokémon</option>
          <option v-for="p in pokemons" :key="p.id" :value="p">
            {{ p.name }}
          </option>
        </select>
      </div>

      <div>
        <label>Pokémon 2:</label>
        <select v-model="pokemon2">
          <option disabled value="">Selecciona un Pokémon</option>
          <option v-for="p in pokemons" :key="p.id" :value="p">
            {{ p.name }}
          </option>
        </select>
      </div>
    </div>

    <button @click="fight" :disabled="!pokemon1 || !pokemon2">
      ¡Combatir!
    </button>

    <div v-if="winner" class="combat-result">
      <h2>Ganador: {{ winner.name }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "Combat",
  props: {
    pokemons: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      pokemon1: null,
      pokemon2: null,
      winner: null
    };
  },
  methods: {
    fight() {
      if (!this.pokemon1 || !this.pokemon2) return;
      
      const power1 = this.pokemon1.attack + this.pokemon1.defense;
      const power2 = this.pokemon2.attack + this.pokemon2.defense;

      this.winner = power1 >= power2 ? this.pokemon1 : this.pokemon2;
    }
  }
};
</script>

<style scoped>
.combat-page {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

.combat-select {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.combat-select div {
  flex: 1;
  margin: 0 10px;
}

.combat-result {
  margin-top: 20px;
  font-size: 1.5rem;
  color: green;
}
</style>
