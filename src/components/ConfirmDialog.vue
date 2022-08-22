<template>
  <q-dialog v-model="dialog">
    <q-card class="dialog-content">
      <q-card-section class="no-padding">
        <q-toolbar>
          <q-toolbar-title class="text-bold">{{ title }}</q-toolbar-title>
        </q-toolbar></q-card-section
      >
      <q-card-section>
        {{ content }}
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat rounded @click="submit(false)" color="grey">取消</q-btn>
        <q-btn flat rounded @click="submit(true)" color="primary">確認</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  title: String,
  content: String,
});

const emit = defineEmits(['close', 'action']);
const close = () => emit('close');
const submit = (val: boolean) => {
  emit('action', val);
  close();
};
const dialog = computed(() => props.isOpen);
const title = computed(() => props.title);
const content = computed(() => props.content);
</script>

<style scoped lang="scss">
.dialog-content {
  width: fit-content;
  min-width: 300px;
  max-width: 100%;
  white-space: pre-line;
  overflow-wrap: break-word;
}
</style>
