<template>
  <div class="person-list">
    <div class="person-list__header">
      <h1 class="person-list__title">
        <span class="material-symbols-rounded person-list__icon">group</span>
        Pessoas
      </h1>
      <div class="person-list__controls">
        <button
          class="icon-button"
          :disabled="loading"
          aria-label="Atualizar agora"
          title="Atualizar agora"
          @click="load"
        >
          <span class="material-symbols-rounded">refresh</span>
        </button>
        <RouterLink class="btn btn-primary" to="/persons/new">
          <span class="material-symbols-rounded">person_add</span>
          Nova Pessoa
        </RouterLink>
      </div>
    </div>

    <section v-if="loading" class="person-list__loading">
      <div class="spinner"></div>
      <p>Carregando pessoas...</p>
    </section>

    <template v-else>
      <section v-if="persons.length === 0" class="person-list__empty">
        <div class="person-list__empty-card">
          <span class="material-symbols-rounded person-list__empty-icon">sentiment_dissatisfied</span>
          <h2>Nenhuma pessoa cadastrada</h2>
          <p>Comece adicionando a primeira pessoa ao sistema.</p>
          <RouterLink class="btn btn-primary" to="/persons/new">
            <span class="material-symbols-rounded">person_add</span>
            Adicionar Pessoa
          </RouterLink>
        </div>
      </section>

      <section v-else class="person-list__table-card">
        <table class="person-list__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th class="person-list__actions-header">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="person in persons" :key="person.id">
              <td>{{ person.id }}</td>
              <td><strong>{{ person.name }}</strong></td>
              <td>
                <a class="person-list__email" :href="`mailto:${person.email}`">{{ person.email }}</a>
              </td>
              <td class="person-list__actions">
                <RouterLink class="icon-button" :to="`/persons/${person.id}/edit`" aria-label="Editar">
                  <span class="material-symbols-rounded">edit</span>
                </RouterLink>
                <button class="icon-button danger" type="button" aria-label="Excluir" @click="askDelete(person)">
                  <span class="material-symbols-rounded">delete</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </template>

    <ConfirmDialog
      :open="dialogOpen"
      :title="'Confirmar exclusao'"
      :message="dialogMessage"
      confirm-text="Excluir"
      cancel-text="Cancelar"
      @confirm="confirmDelete"
      @cancel="closeDialog"
    />

    <div v-if="toast" class="toast">{{ toast }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import ConfirmDialog from '../components/ConfirmDialog.vue';
import { personService } from '../services/personService';
import type { Person } from '../types/person';

const persons = ref<Person[]>([]);
const loading = ref(true);
const dialogOpen = ref(false);
const targetPerson = ref<Person | null>(null);
const toast = ref<string | null>(null);

const dialogMessage = computed(() => {
  if (!targetPerson.value) return 'Deseja excluir esta pessoa?';
  return `Deseja realmente excluir ${targetPerson.value.name}?`;
});

const load = async () => {
  loading.value = true;
  try {
    persons.value = await personService.list();
  } catch (error) {
    console.error(error);
    showToast('Erro ao carregar pessoas');
  } finally {
    loading.value = false;
  }
};

const askDelete = (person: Person) => {
  targetPerson.value = person;
  dialogOpen.value = true;
};

const closeDialog = () => {
  dialogOpen.value = false;
  targetPerson.value = null;
};

const confirmDelete = async () => {
  if (!targetPerson.value) return;
  try {
    await personService.remove(targetPerson.value.id);
    showToast('Pessoa excluida com sucesso');
    await load();
  } catch (error) {
    console.error(error);
    showToast('Erro ao excluir pessoa');
  } finally {
    closeDialog();
  }
};

const showToast = (message: string) => {
  toast.value = message;
  setTimeout(() => {
    toast.value = null;
  }, 3000);
};

onMounted(load);
</script>

<style scoped>
.person-list {
  max-width: 1200px;
  margin: 0 auto;
}

.person-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.person-list__title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
}

.person-list__icon {
  font-size: 36px;
  width: 36px;
  height: 36px;
  color: #3f51b5;
}

.person-list__controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.person-list__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 64px 24px;
  color: rgba(0, 0, 0, 0.6);
}

.spinner {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 4px solid rgba(63, 81, 181, 0.2);
  border-top-color: #3f51b5;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.person-list__empty {
  text-align: center;
  padding: 12px;
}

.person-list__empty-card {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 48px 24px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  text-align: center;
}

.person-list__empty-card h2 {
  margin: 16px 0 8px;
  color: #1e293b;
}

.person-list__empty-card p {
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 24px;
}

.person-list__empty-icon {
  font-size: 64px;
  width: 64px;
  height: 64px;
  color: rgba(0, 0, 0, 0.38);
  margin-bottom: 16px;
}

.person-list__table-card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
  overflow: hidden;
}

.person-list__table {
  width: 100%;
  border-collapse: collapse;
}

.person-list__table th,
.person-list__table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.person-list__table tbody tr:hover {
  background: rgba(63, 81, 181, 0.04);
}

.person-list__actions-header {
  text-align: right;
}

.person-list__actions {
  text-align: right;
  white-space: nowrap;
  display: flex;
  justify-content: flex-end;
  gap: 6px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  font-weight: 700;
  transition: transform 0.12s ease, box-shadow 0.16s ease, background 0.16s ease, border 0.16s ease;
}

.btn-primary {
  background: #3f51b5;
  color: #fff;
  border-color: #2b3990;
  box-shadow: 0 10px 30px rgba(63, 81, 181, 0.25);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 36px rgba(63, 81, 181, 0.28);
}

.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.16s ease, background 0.16s ease;
}

.icon-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.1);
}

.icon-button.danger {
  color: #c62828;
  border-color: rgba(198, 40, 40, 0.2);
}

.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #111827;
  color: #fff;
  padding: 12px 16px;
  border-radius: 10px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.2);
  z-index: 30;
}

@media (max-width: 768px) {
  .person-list__header {
    flex-direction: column;
    align-items: stretch;
  }

  .person-list__title {
    font-size: 24px;
  }
}
</style>
