<template>
  <header class="navbar" role="banner">
    <button class="icon-button" type="button" aria-label="Abrir menu" @click="$emit('toggle')">
      <span class="material-symbols-rounded">menu</span>
    </button>

    <span class="navbar__brand">TesteFull</span>
    <span class="navbar__divider" aria-hidden="true"></span>

    <div class="navbar__spacer"></div>

    <span class="navbar__framework">Vue</span>

    <div class="navbar__spacer"></div>

    <a
      class="icon-button"
      href="http://localhost:3000/api"
      target="_blank"
      rel="noreferrer"
      aria-label="API Docs"
    >
      <span class="material-symbols-rounded">description</span>
    </a>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  padding-inline: 8px;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 8px;
  height: 64px;
  background: linear-gradient(90deg, #3f51b5 0%, #2b3990 100%);
  color: #fff;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.16);
}

.navbar__brand {
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-left: 8px;
}

.navbar__divider {
  height: 24px;
  width: 1px;
  background: rgba(255, 255, 255, 0.38);
  margin: 0 12px;
  border-radius: 999px;
}

.navbar__spacer {
  flex: 1;
}

.navbar__framework {
  font-weight: 600;
  font-size: 1.125rem;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.9);
}

.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.14);
  color: inherit;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.2s ease;
}

.icon-button:hover {
  background: rgba(255, 255, 255, 0.22);
  transform: translateY(-1px);
}

.icon-button:active {
  transform: translateY(0);
}

.material-symbols-rounded {
  font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24;
  font-size: 22px;
}
</style>
