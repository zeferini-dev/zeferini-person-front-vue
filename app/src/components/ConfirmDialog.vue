<template>
  <teleport to="body">
    <div v-if="open" class="dialog__backdrop" @click="onCancel"></div>
    <section v-if="open" class="dialog" role="dialog" aria-modal="true">
      <h2 class="dialog__title">{{ title }}</h2>
      <p class="dialog__message">{{ message }}</p>
      <footer class="dialog__actions">
        <button type="button" class="btn btn-secondary" @click="onCancel">{{ cancelText }}</button>
        <button type="button" class="btn btn-warn" @click="onConfirm">{{ confirmText }}</button>
      </footer>
    </section>
  </teleport>
</template>

<script setup lang="ts">
const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: 'Confirmar' },
  message: { type: String, default: 'Deseja continuar?' },
  confirmText: { type: String, default: 'Confirmar' },
  cancelText: { type: String, default: 'Cancelar' }
});

const emit = defineEmits<{ confirm: []; cancel: [] }>();

const onConfirm = () => emit('confirm');
const onCancel = () => emit('cancel');
</script>

<style scoped>
.dialog__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.35);
  z-index: 20;
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(480px, 90vw);
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 18px 46px rgba(0, 0, 0, 0.22);
  padding: 24px;
  z-index: 21;
}

.dialog__title {
  margin: 0 0 10px;
  font-size: 20px;
  color: #111827;
}

.dialog__message {
  margin: 0 0 18px;
  color: #4b5563;
  line-height: 1.5;
}

.dialog__actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: #eef2f7;
  color: #111827;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.12s ease, box-shadow 0.16s ease, background 0.16s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.btn-secondary {
  background: #eef2f7;
  color: #111827;
}

.btn-warn {
  background: #c62828;
  color: #fff;
  border-color: #b71c1c;
}
</style>
