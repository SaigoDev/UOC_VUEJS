<template>
  <div :class="theme">
    <header>
      <nav id="navbar" class="nav">
        <ul class="nav-list">
          <li><router-link to="/">Inici</router-link></li>
          <li><router-link to="/combat">Combat</router-link></li>
        </ul>
        
        <div class="theme-buttons">
          <button @click="setTheme('light')">🌞 Clar</button>
          <button @click="setTheme('dark')">🌙 Fosc</button>
        </div>
      </nav>
    </header>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      theme: 'light-theme'
    }
  },
  methods: {
    setTheme(theme) {
      this.theme = theme + '-theme'
      localStorage.setItem('theme', this.theme)
    }
  },
  mounted() {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      this.theme = savedTheme
    }
  }
}
</script>
