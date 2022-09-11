<template>
  <div class="q-gutter-md items-center">
    <q-file
      v-model="file"
      label="Pick files"
      filled
      counter
      accept=".csv"
      @update:model-value="previewFile"
    >
      <template #prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>
  </div>
  <div v-if="file != null" class="q-gutter-md row items-center">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ `Preview ${fileName}` }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="preview-card">
        {{ txtReader }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import _ from 'lodash';
// import { PreviewTableHeader } from '../models/file-upload';

const file = ref(null);
let txtReader = ref('');
const fileName = computed(() => {
  return _.isEmpty(file) ? '' : file.value['name'];
});
const reader = new FileReader();
const previewFile = () => {
  reader.readAsText(file.value);
  reader.onloadend = () => {
    txtReader.value = reader.result as string;
    // txtToTableData(txtReader.value);
  };
};
// TODO: convert to table
// let previewHeaders = reactive<Array<PreviewTableHeader>>([]);
// let previewData = reactive([]);
// const txtToTableData = (txt: string) => {
//   const stringRows = txt.split('\n');
//   console.log('string by row');
//   stringRows.forEach((row) => console.log(row));
//   const firstRow = stringRows.shift() as string;
//   console.log(firstRow);
//   console.log('header');
//   console.log(
//     firstRow.split(',').reduce((res: Array<PreviewTableHeader>, e) => {
//       const obj: PreviewTableHeader = {
//         name: e,
//         sortable: true,
//         label: e,
//       };
//       res.push(obj);
//       return res;
//     }, [])
//   );
//   previewHeaders = _.cloneDeep(
//     firstRow.split(',').reduce((res: Array<PreviewTableHeader>, e) => {
//       const obj: PreviewTableHeader = {
//         name: e,
//         sortable: true,
//         label: e,
//       };
//       res.push(obj);
//       return res;
//     }, [])
//   );
// };
</script>

<style lang="scss" scoped>
.preview-card {
  width: max-content;
  max-height: 500px;
  overflow-wrap: break-word;
  white-space: pre-line;
}
</style>
