<template>
  <div class="app-shell">
    <!-- Sidenav/Drawer (overlay em mobile) -->
    <nav
      class="app-shell__drawer"
      :class="{ 'app-shell__drawer--open': drawerOpen }"
      aria-label="Menu lateral"
    >
      <SideMenu @close="closeDrawer" />
    </nav>

    <!-- Backdrop (visível quando drawer aberto) -->
    <div
      class="app-shell__backdrop"
      :class="{ visible: drawerOpen }"
      @click="closeDrawer"
      aria-hidden="true"
    ></div>

    <!-- Main content -->
    <div class="app-shell__main">
      <Navbar @toggle="toggleDrawer" />
      <main class="app-shell__content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Navbar from './components/Navbar.vue';
import SideMenu from './components/SideMenu.vue';

const drawerOpen = ref(false);

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};

const closeDrawer = () => {
  drawerOpen.value = false;
};
</script>

<style scoped>
.app-shell {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  background: radial-gradient(circle at 10% 20%, rgba(65, 105, 225, 0.08), transparent 25%),
    radial-gradient(circle at 80% 0%, rgba(0, 180, 216, 0.12), transparent 25%),
    linear-gradient(135deg, #f7f9fc 0%, #eef2f7 100%);
  position: relative;
}

.app-shell__drawer {
  position: fixed;
  inset: 0;
  inset-inline-end: auto;
  width: 260px;
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1200;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(6px);
  border-right: 1px solid rgba(0, 0, 0, 0.08);
}

.app-shell__drawer--open {
  transform: translateX(0);
}

.app-shell__main {
  grid-column: 1;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-shell__content {
  padding: 24px;
  min-height: calc(100vh - 64px);
  box-sizing: border-box;
  flex: 1;
}

.app-shell__backdrop {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.32);
  z-index: 1100;
  animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.app-shell__backdrop.visible {
  display: block;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
