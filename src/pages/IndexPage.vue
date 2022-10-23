<template>
  <!-- <q-page class="items-center justify-evenly row q-gutter-md"> -->
  <q-page class="padding">
    <!-- <div class="row">
      <div class="col">Index home</div>
    </div> -->
    <!-- <div class="row"> -->
    <!-- <div class="col">
        <q-btn @click="test">test confirm dialog</q-btn>
      </div> -->
    <!-- <div class="col"> -->
    <!-- <FileUploader /> -->
    <model-flow-build />
    <!-- </div>
    </div> -->
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
// import FileUploader from 'components/FileUploader.vue';
import ModelFlowBuild from 'components/ml/ModelFlowBuild.vue';

const dialog = reactive<ConfirmDialogProps>({
  key: 0,
  isOpen: false,
  title: '',
  content: '',
});

// const test = () => {
//   dialog.key++;
//   dialog.isOpen = true;
//   dialog.title = 'Test';
//   dialog.content =
//     'Test content\njasiofajs;difasjfiaos;dnfansjkdvnsnfdoi;aoisdfjiajdsoi;fjao;jsdoifjaoi;sjdoasoinfkadhoi;navdsfjkdihvnhoindfsjk09asjoi;dnlkf;iaosnlkdfialnkfaoi;sdlk';
// };

const action = (val: boolean) => {
  console.log(`action: ${val}`);
};
</script>
