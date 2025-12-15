<template>
  <div class="pokemon-detail">
    <h2>{{ pokemon.name }}</h2>

    <img
      :src="pokemon.image"
      :alt="pokemon.name"
      class="pokemon-img"
    >

    <div class="pokemon-stat">Atac: {{ pokemon.attack }}</div>
    <div class="pokemon-stat">Defensa: {{ pokemon.defense }}</div>

    <div class="pokemon-type">
      <span
        v-for="type in pokemon.types"
        :key="type"
        :class="`type-${type}`"
      >
        {{ type }}
      </span>
    </div>

    <button class="back-to-list" @click="$emit('back')">
      Tornar a la llista
    </button>
  </div>
</template>

<script>
export default {
  name: 'PokemonDetail',

  props: {
    pokemon: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
