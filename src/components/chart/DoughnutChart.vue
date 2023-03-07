<template>
  <q-card>
    <DoughnutChart
      v-if="type === ChartType.doughnut"
      v-bind="doughnutChartProps"
    />
  </q-card>
</template>

<script setup lang="ts">
import { computed, defineProps, defineComponent, ref, inject } from 'vue';

import { DoughnutChart, useDoughnutChart } from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { ChartType, ChartComponetData } from '../../models/chart';

Chart.register(...registerables);
defineComponent(DoughnutChart);

// props
const props = defineProps({
  title: { type: String, default: '' },
  type: { type: String, default: ChartType.doughnut },
});

const typeIdx = Object.values(ChartType).indexOf(
  props.type as unknown as ChartType
);
const chartTypeKey = Object.keys(ChartType)[typeIdx];
console.log(chartTypeKey);

// inject
const a = inject('chartData', []) as Array<ChartComponetData>;

// data

// computed
const dataValues = computed(() => {
  return a.map((e) => e.value);
});
const dataLabels = computed(() => {
  return a.map((e) => e.label);
});
const dataBkColors = computed(() => {
  return a.map((e) => e.backgroundColor);
});

const testData = computed<ChartData<'doughnut'>>(() => ({
  labels: dataLabels.value,
  datasets: [
    {
      data: dataValues.value,
      backgroundColor: dataBkColors.value,
    },
  ],
}));
const options = computed<ChartOptions<'doughnut'>>(() => ({
  scales: {
    myScale: {
      type: 'category',
      position: 'left',
    },
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: props.title,
    },
  },
}));

const { doughnutChartProps } = useDoughnutChart({
  chartData: testData,
  options,
});
</script>
