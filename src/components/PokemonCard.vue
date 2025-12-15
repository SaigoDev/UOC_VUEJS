<template>
  <div class="pokemon-card" @click="handleClick">
    <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-img">

    <div class="pokemon-name">{{ pokemon.name }}</div>
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
  </div>
</template>

<script>
export default {
  name: 'PokemonCard',

  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },

  methods: {
    handleClick() {
      this.$emit('select', this.pokemon)
    }
  }
}
</script>

<style scoped>
</style>
