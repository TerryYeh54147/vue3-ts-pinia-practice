<template>
  <q-page>
    <q-card>
      <q-card-section>
        <FileUploader></FileUploader>
      </q-card-section>

      <q-card-section>
        <LineChartCard title="test chart"></LineChartCard>
      </q-card-section>
      <!-- <q-card-actions><q-btn icon="add" @click="add"></q-btn></q-card-actions> -->
    </q-card>
  </q-page>
</template>
<script setup lang="ts">
import { provide, reactive } from 'vue';
import FileUploader from 'components/FileUploader.vue';
import LineChartCard from 'src/components/chart/LineChart.vue';
import { DounghChartData, LineChartData } from 'src/models/chart';
import { getRandomColor } from 'src/utils/util';
import _ from 'lodash';

// data
// const data = reactive<Array<DounghChartData>>([
//   { label: 'test1', value: 10, color: getRandomColor() },
//   { label: 'test2', value: 23, color: getRandomColor() },
//   { label: 'test3', value: 34, color: getRandomColor() },
//   { label: 'test4', value: 13, color: getRandomColor() },
//   { label: 'test5', value: 100, color: getRandomColor() },
// ]);
let data = reactive<Array<LineChartData>>([
  {
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
  },
]);

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

// provide
provide('chartData', data);
</script>
