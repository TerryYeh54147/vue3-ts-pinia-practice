<template>
  <div class="q-gutter-md items-center">
    <q-file
      v-model="file"
      label="Pick files"
      filled
      clearable
      counter
      accept=".csv"
      @update:model-value="previewFile"
      @clear="initialPreviewData"
    >
      <template #prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>
  </div>
  <div class="q-gutter-lg items-center">
    <q-table
      v-if="!_.isEmpty(previewHeaders)"
      :title="`Preview ${fileName}`"
      :loading="isLoading"
      :columns="previewHeaders"
      :rows="previewData"
      :row-key="previewHeaders[0].name"
    ></q-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import _ from 'lodash';
import { PreviewTableHeader } from '../models/file-upload';

const file = ref(null);
let isLoading = ref(false);
let fileName = ref('');

const previewFile = () => {
  const reader = new FileReader();
  // using array buffer to instead of read as text
  // because read as text will load whole file to memory first, it will crush your memory if file size too large
  if (file.value != null) {
    reader.readAsArrayBuffer(file.value);
    console.log(file.value);
    fileName.value = file.value['name'];
  }
  reader.onloadend = () => {
    let bytes = new Uint8Array(reader.result);
    const decoder = new TextDecoder('utf-8').decode(bytes);
    isLoading.value = true;
    txtToTableData(decoder);
    isLoading.value = false;
  };
};

let previewHeaders = reactive<Array<PreviewTableHeader>>([]);
let previewData = reactive([]);

const txtToTableData = (txt: string) => {
  const stringRows = txt.split('\n');
  const firstRow = stringRows.shift() as string;
  setTableHeader(firstRow, previewHeaders);
  setTableData(stringRows, previewData);
};
const initialPreviewData = () => {
  fileName.value = '';
  previewHeaders.length = 0;
  previewData.length = 0;
};

const setTableHeader = (txt: string, header: Array<PreviewTableHeader>) => {
  return txt.split(',').reduce((res: Array<PreviewTableHeader>, e) => {
    const obj: PreviewTableHeader = {
      name: e,
      sortable: true,
      label: e,
      field: e,
    };
    res.push(obj);
    return res;
  }, header);
};

const setTableData = (stringRows: Array<string>, dataset: never[]) => {
  stringRows.reduce((res, str: string) => {
    if (str.length > 0) {
      const rowData = str.trim().split(',');
      if (!_.isString(str) || rowData.length != previewHeaders.length) {
        console.error('Invalid csv file data');
      } else {
        const data = rowData.reduce((obj, e, idx) => {
          if (_.isEmpty(previewHeaders)) {
            console.error('previewHeaders is empty');
          } else {
            obj[previewHeaders[idx].name] = e;
          }
          return obj;
        }, {});
        res.push(data);
      }
    }
    return res;
  }, dataset);
};
</script>
