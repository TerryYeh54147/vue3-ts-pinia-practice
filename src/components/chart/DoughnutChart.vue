<template>
  <q-card>
    <DoughnutChart v-bind="doughnutChartProps" />
  </q-card>
</template>

<script setup lang="ts">
import { computed, defineProps, defineComponent, ref, inject } from 'vue';

import { DoughnutChart, useDoughnutChart } from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { ChartComponetData } from '../../models/chart';

Chart.register(...registerables);
defineComponent(DoughnutChart);

// props
const props = defineProps({
  title: { type: String, default: '' },
});

// inject
const a = inject('data', []) as Array<ChartComponetData>;

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
      type: 'logarithmic',
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
