import { createRouter, createWebHistory } from 'vue-router';
import PersonList from '../pages/PersonList.vue';
import PersonForm from '../pages/PersonForm.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/persons' },
    { path: '/persons', component: PersonList },
    { path: '/persons/new', component: PersonForm },
    { path: '/persons/:id/edit', component: PersonForm },
    { path: '/:pathMatch(.*)*', redirect: '/persons' }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
