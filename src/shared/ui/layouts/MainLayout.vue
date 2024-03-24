<template>
  <div class="layout">
    <slot class="navbar" name="navbar" />
    <main class="content">
      <router-view />
    </main>
    <slot />
    <slot class="music-player" name="music-player" />
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  height: 100%;
  grid-template-columns: 180px 1fr;
  grid-template-rows: 1fr 48px;
  grid-template-areas:
    'navbar content'
    'music-player music-player';
}

.music-player {
  grid-area: music-player;
}

.content {
  grid-area: content;
}

.navbar {
  grid-area: navbar;
}
</style>
