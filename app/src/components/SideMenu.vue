<template>
  <div class="side-menu">
    <div class="side-menu__inner">
      <nav class="side-menu__section">
        <h3 class="side-menu__title">Principal</h3>
        <RouterLink
          v-for="item in mainLinks"
          :key="item.path"
          :to="item.path"
          class="side-menu__item"
          active-class="is-active"
          @click="$emit('close')"
        >
          <span class="material-symbols-rounded">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>

      <nav class="side-menu__section">
        <h3 class="side-menu__title">APIs</h3>
        <a
          v-for="item in apiLinks"
          :key="item.href"
          :href="item.href"
          class="side-menu__item"
          target="_blank"
          rel="noreferrer"
        >
          <span class="material-symbols-rounded">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
          <span class="material-symbols-rounded side-menu__external" aria-hidden="true">open_in_new</span>
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

type NavItem = {
  label: string;
  icon: string;
  path?: string;
  href?: string;
};

defineEmits<{ close: [] }>();

const mainLinks: NavItem[] = [
  { label: 'Pessoas', icon: 'group', path: '/persons' }
];

const apiLinks: NavItem[] = [
  { label: 'API Docs', icon: 'description', href: 'http://localhost:3000/api' },
  { label: 'API JSON', icon: 'data_object', href: 'http://localhost:3000/openapi.json' },
  { label: 'API Persons', icon: 'list', href: 'http://localhost:3000/persons' },
  { label: 'API Root', icon: 'home', href: 'http://localhost:3000/' },
  { label: 'API JSON (Nest)', icon: 'code', href: 'http://localhost:3000/api-json' }
];

const onNavigate = (emit: Function) => {
  emit('close');
};
</script>

<style scoped>
.side-menu {
  display: block;
  padding: 12px;
  height: 100%;
  overflow-y: auto;
}

.side-menu__inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.side-menu__section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.side-menu__title {
  font-size: 12px;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.54);
  padding: 12px 16px 4px;
  margin: 0;
  text-transform: uppercase;
}

.side-menu__item {
  display: grid;
  grid-template-columns: 24px 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  color: rgba(0, 0, 0, 0.8);
  transition: background 0.15s ease, transform 0.1s ease;
  text-decoration: none;
  cursor: pointer;
}

.side-menu__item:hover {
  background: rgba(63, 81, 181, 0.08);
  transform: translateX(2px);
}

.side-menu__item.is-active,
.side-menu__item.router-link-active,
.side-menu__item.router-link-exact-active {
  background: rgba(63, 81, 181, 0.12);
  color: #2b3990;
  font-weight: 700;
}

.side-menu__external {
  color: rgba(0, 0, 0, 0.54);
  font-size: 18px;
}
</style>
