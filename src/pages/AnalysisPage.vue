<template>
  <q-page>
    <q-card>
      <q-card-section>
        <FileUploader></FileUploader>
      </q-card-section>

      <q-card-section>
        <ChartCard title="test chart"></ChartCard>
      </q-card-section>
      <!-- <q-card-actions><q-btn icon="add" @click="add"></q-btn></q-card-actions> -->
    </q-card>
  </q-page>
</template>
<script setup lang="ts">
import { provide, reactive } from 'vue';
import FileUploader from 'components/FileUploader.vue';
import ChartCard from 'src/components/chart/DoughnutChart.vue';
import { ChartComponetData } from 'src/models/chart';
import { getRandomColor } from 'src/utils/util';
import _ from 'lodash';

// data
const data = reactive<Array<ChartComponetData>>([
  { label: 'test1', value: 10, backgroundColor: getRandomColor() },
  { label: 'test2', value: 23, backgroundColor: getRandomColor() },
  { label: 'test3', value: 34, backgroundColor: getRandomColor() },
  { label: 'test4', value: 13, backgroundColor: getRandomColor() },
  { label: 'test5', value: 100, backgroundColor: getRandomColor() },
]);

// provide
provide('data', data);
// provide('test', data);

// function
// for test
// const add = () => {
//   return data.push({
//     label: `test${_.random(0,10000)}`,
//     value: _.random(0,10000),
//     backgroundColor: getRandomColor(),
//   });
// };
</script>
