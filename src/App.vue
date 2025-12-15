<template>
  <div>
    <header>
      <nav id="navbar" class="nav">
        <ul class="nav-list">
          <li><router-link to="/">Inici</router-link></li>
          <li><router-link to="/combat">Combat</router-link></li>
        </ul>
      </nav>
    </header>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
