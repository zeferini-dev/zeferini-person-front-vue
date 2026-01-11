<template>
  <div class="person-form">
    <div class="person-form__header">
      <h1 class="person-form__title">
        <span class="material-symbols-rounded person-form__icon">{{ isEdit ? 'edit' : 'person_add' }}</span>
        {{ isEdit ? 'Editar' : 'Nova' }} Pessoa
      </h1>
    </div>

    <section class="person-form__card">
      <div v-if="loading" class="progress"></div>
      <form class="person-form__form" @submit.prevent="onSubmit">
        <label class="person-form__field">
          <span class="person-form__label">Nome completo</span>
          <div class="person-form__input-wrapper" :class="{ 'has-error': touched.name && errors.name }">
            <span class="material-symbols-rounded person-form__prefix">person</span>
            <input
              v-model.trim="form.name"
              maxlength="120"
              autocomplete="off"
              placeholder="Digite o nome completo"
              @blur="touched.name = true"
            />
          </div>
          <small class="person-form__hint">{{ form.name.length }}/120</small>
          <p v-if="touched.name && errors.name" class="person-form__error">{{ errors.name }}</p>
        </label>

        <label class="person-form__field">
          <span class="person-form__label">E-mail</span>
          <div class="person-form__input-wrapper" :class="{ 'has-error': touched.email && errors.email }">
            <span class="material-symbols-rounded person-form__prefix">email</span>
            <input
              v-model.trim="form.email"
              maxlength="180"
              autocomplete="off"
              placeholder="exemplo@email.com"
              @blur="touched.email = true"
            />
          </div>
          <small class="person-form__hint">{{ form.email.length }}/180</small>
          <p v-if="touched.email && errors.email" class="person-form__error">{{ errors.email }}</p>
        </label>

        <div class="person-form__actions">
          <button class="btn btn-primary" type="submit" :disabled="saving || loading">
            <span class="material-symbols-rounded">{{ saving ? 'hourglass_empty' : 'save' }}</span>
            {{ saving ? 'Salvando...' : 'Salvar' }}
          </button>
          <RouterLink class="btn btn-secondary" :class="{ disabled: saving }" to="/persons">
            <span class="material-symbols-rounded">cancel</span>
            Cancelar
          </RouterLink>
        </div>
      </form>
    </section>

    <div class="person-form__help">
      <span class="material-symbols-rounded">info</span>
      <p>Preencha todos os campos obrigatorios para continuar.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { personService } from '../services/personService';
import type { Person } from '../types/person';

const route = useRoute();
const router = useRouter();

const idParam = computed(() => route.params.id as string | undefined);
const isEdit = computed(() => Boolean(idParam.value));

const form = reactive({
  name: '',
  email: ''
});

const touched = reactive({
  name: false,
  email: false
});

const errors = reactive({
  name: '' as string | null,
  email: '' as string | null
});

const loading = ref(false);
const saving = ref(false);

const validate = () => {
  errors.name = null;
  errors.email = null;

  if (!form.name.trim()) {
    errors.name = 'Este campo e obrigatorio';
  } else if (form.name.length > 120) {
    errors.name = 'Maximo de 120 caracteres';
  }

  if (!form.email.trim()) {
    errors.email = 'Este campo e obrigatorio';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'E-mail invalido';
  } else if (form.email.length > 180) {
    errors.email = 'Maximo de 180 caracteres';
  }

  return !errors.name && !errors.email;
};

const loadPerson = async (id: string) => {
  loading.value = true;
  try {
    const person: Person = await personService.get(id);
    form.name = person.name;
    form.email = person.email;
  } catch (error) {
    console.error(error);
    await router.push('/persons');
  } finally {
    loading.value = false;
  }
};

const onSubmit = async () => {
  touched.name = true;
  touched.email = true;

  if (!validate()) return;

  saving.value = true;
  try {
    if (isEdit.value && idParam.value) {
      await personService.update(idParam.value, {
        name: form.name,
        email: form.email
      });
    } else {
      await personService.create({
        name: form.name,
        email: form.email
      });
    }
    await router.push('/persons');
  } catch (error) {
    console.error(error);
  } finally {
    saving.value = false;
  }
};

watch(
  () => idParam.value,
  (id) => {
    if (id) {
      loadPerson(id);
    } else {
      form.name = '';
      form.email = '';
      touched.name = false;
      touched.email = false;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.person-form {
  max-width: 640px;
  margin: 0 auto;
}

.person-form__header {
  margin-bottom: 18px;
}

.person-form__title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
}

.person-form__icon {
  font-size: 36px;
  width: 36px;
  height: 36px;
  color: #3f51b5;
}

.person-form__card {
  background: #fff;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 24px;
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.08);
}

.progress {
  width: 100%;
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(63, 81, 181, 0.12), rgba(63, 81, 181, 0.4));
  position: relative;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress::after {
  content: '';
  position: absolute;
  inset: 0;
  width: 40%;
  background: #3f51b5;
  animation: slide 1.2s ease-in-out infinite;
}

@keyframes slide {
  0% { transform: translateX(-120%); }
  50% { transform: translateX(120%); }
  100% { transform: translateX(260%); }
}

.person-form__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 0;
}

.person-form__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.person-form__label {
  font-weight: 600;
  color: #1e293b;
}

.person-form__input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8fafc;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 10px 12px;
  transition: border 0.15s ease, box-shadow 0.15s ease;
}

.person-form__input-wrapper:focus-within {
  border-color: #3f51b5;
  box-shadow: 0 10px 28px rgba(63, 81, 181, 0.15);
}

.person-form__input-wrapper.has-error {
  border-color: #c62828;
}

.person-form__prefix {
  color: #64748b;
}

.person-form__input-wrapper input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: #0f172a;
}

.person-form__hint {
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
}

.person-form__error {
  margin: 0;
  color: #c62828;
  font-size: 14px;
}

.person-form__actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
  flex-wrap: wrap;
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
  min-width: 140px;
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

.btn-secondary {
  background: #fff;
  color: #0f172a;
  border: 1px solid rgba(0, 0, 0, 0.14);
}

.btn-secondary.disabled {
  pointer-events: none;
  opacity: 0.6;
}

.person-form__help {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 12px 16px;
  background: #e8eaf6;
  border-radius: 8px;
  color: #0d1b2a;
}

.person-form__help .material-symbols-rounded {
  color: #3f51b5;
  font-size: 20px;
  width: 20px;
  height: 20px;
}

.person-form__help p {
  margin: 0;
  font-size: 14px;
}

@media (max-width: 768px) {
  .person-form__title {
    font-size: 24px;
  }

  .person-form__card {
    padding: 18px;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
