<template>
  <q-page class="row items-center justify-evenly">
    Index home
    <q-btn @click="test">test confirm dialog</q-btn>
  </q-page>
  <confirm-dialog
    :key="dialog.key"
    :is-open="dialog.isOpen"
    :title="dialog.title"
    :content="dialog.content"
    @close="dialog.isOpen = !dialog.isOpen"
    @action="action"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { ConfirmDialogProps } from '../models/dialog';
import ConfirmDialog from 'components/ConfirmDialog.vue';

const dialog = reactive<ConfirmDialogProps>({
  key: 0,
  isOpen: false,
  title: '',
  content: '',
});

const test = () => {
  dialog.key++;
  dialog.isOpen = true;
  dialog.title = 'Test';
  dialog.content =
    'Test content\njasiofajs;difasjfiaos;dnfansjkdvnsnfdoi;aoisdfjiajdsoi;fjao;jsdoifjaoi;sjdoasoinfkadhoi;navdsfjkdihvnhoindfsjk09asjoi;dnlkf;iaosnlkdfialnkfaoi;sdlk';
};

const action = (val: boolean) => {
  console.log(`action: ${val}`);
};
</script>
