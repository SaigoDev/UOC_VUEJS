<template>
  <div>

    <header>
      <nav id="navbar" class="nav">
        <ul class="nav-list">
          <li><a href="#">Inici</a></li>
          <li><a href="#">Combat</a></li>
        </ul>
      </nav>
    </header>

    <section class="cartesPokemon">
      <h1>Pokemon:</h1>
      
      <button
        class="generate-pokemon"
        v-if="!showDetail"
        @click="generatePokemons"
      >
        Generar Pokemon aleatoris
      </button>
      
      <input
        class="pokemon-filter"
        v-if="!showDetail"
        type="text"
        placeholder="Filtra Pokemon per nom..."
        v-model="filter"
      >
      
      <div class="pokemon-container" v-if="!showDetail">
        <PokemonCard
          v-for="pokemon in filteredPokemons"
          :key="pokemon.id"
          :pokemon="pokemon"
          @select="openDetail"
        />
      </div>
      
      <PokemonDetail
        v-if="showDetail && selectedPokemon"
        :pokemon="selectedPokemon"
        @back="backToList"
      />

    </section>
  </div>
</template>

<script>
import PokemonCard from './components/PokemonCard.vue'
import PokemonDetail from './components/PokemonDetail.vue'
import Combat from './views/Combat.vue'

export default {
  name: 'App',

  components: {
    PokemonCard,
    PokemonDetail
  },

  data() {
    return {
      pokemons: [],
      selectedPokemon: null,
      filter: '',
      showDetail: false
    }
  },

  computed: {
    filteredPokemons() {
      return this.pokemons.filter(p =>
        p.name.toLowerCase().includes(this.filter.toLowerCase())
      )
    }
  },

  methods: {
    getRandomPokemonIds() {
      const ids = []
      while (ids.length < 10) {
        const randomId = Math.floor(Math.random() * 1000) + 1
        if (!ids.includes(randomId)) ids.push(randomId)
      }
      return ids
    },

    async fetchPokemonData(id) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        const data = await response.json()

        return {
          id: data.id,
          name: data.name,
          attack: data.stats.find(s => s.stat.name === 'attack').base_stat,
          defense: data.stats.find(s => s.stat.name === 'defense').base_stat,
          image: data.sprites.front_default,
          types: data.types.map(t => t.type.name)
        }
      } catch (error) {
        console.error('Error al cargar el Pokémon', error)
      }
    },

    async loadPokemons(ids) {
      this.pokemons = []
      for (const id of ids) {
        const pokemon = await this.fetchPokemonData(id)
        this.pokemons.push(pokemon)
      }
    },

    async generatePokemons() {
      const ids = this.getRandomPokemonIds()
      localStorage.setItem('pokemonIds', JSON.stringify(ids))
      await this.loadPokemons(ids)
    },

    openDetail(pokemon) {
      this.selectedPokemon = pokemon
      this.showDetail = true
    },

    backToList() {
      this.showDetail = false
      this.selectedPokemon = null
    }
  },

  async mounted() {
    const savedIds = JSON.parse(localStorage.getItem('pokemonIds'))

    if (savedIds) {
      await this.loadPokemons(savedIds)
    } else {
      await this.generatePokemons()
    }
  }
}
</script>

<style>
</style>
