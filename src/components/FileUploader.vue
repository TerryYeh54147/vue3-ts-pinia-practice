<template>
  <div class="q-gutter-lg items-center">
    <q-toggle v-model="needPreview" label="Preview Data" />
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
  <div class="q-my-md items-center">
    <q-table
      v-if="needPreview && !_.isEmpty(previewHeaders)"
      :title="`Preview ${fileName}`"
      :loading="isLoading"
      :columns="previewHeaders"
      :rows="previewData"
      :row-key="previewHeaders[0].name"
      :pagination="paginationSetup"
    ></q-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onDeactivated, inject } from 'vue';
import _ from 'lodash';
import { PreviewTableHeader } from '../models/file-upload';
import { LineChartData } from '../models/chart';
import { getRandomColor } from '../utils/util';

// props
const props = defineProps({
  data: null,
});

// inject
let chartData = inject('chartData', [] as Array<LineChartData>);

// data
// const file = ref(null);
const file = ref(_.cloneDeep(props.data));
let isLoading = ref(false);
let fileName = ref('');

let needPreview = ref(false);
const paginationSetup = {
  rowsPerPage: 10,
};

let previewHeaders = reactive<Array<PreviewTableHeader>>([]);
let previewData = reactive([] as Array<Record<string, string | number>>);

// function
const previewFile = () => {
  initialPreviewData();
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
const setTableData = (
  stringRows: Array<string>,
  dataset: Array<Record<string, string | number>>
) => {
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
  chartData = getChartData(previewData);
  console.log('=== file uploader ===');
  console.log(chartData);
};

const getChartData = (data: Array<Record<string, string | number>>) => {
  console.log(data);
  const labels = previewHeaders.map((e) => e.name);
  const dataList = labels.reduce((res: Array<LineChartData>, k: string) => {
    const newItem = {} as LineChartData;
    newItem.label = k;
    newItem.data = data.map((e) => e[k]);
    newItem.borderColor = getRandomColor();
    newItem.fill = true;
    res.push(newItem);
    return res;
  }, [] as Array<LineChartData>);

  console.log(labels);
  console.log(dataList);
  return dataList;
};

const emit = defineEmits(['update']);
onDeactivated(() => {
  console.log('onDeactivated');
  emit('update', file.value);
});
</script>
