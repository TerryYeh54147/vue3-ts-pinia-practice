<template>
  <q-card>
    <LineChart v-bind="lineChartProps" />
  </q-card>
</template>

<script setup lang="ts">
import { computed, defineProps, defineComponent, inject } from 'vue';

import { LineChart, useLineChart } from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { ChartType, LineChartData } from '../../models/chart';

Chart.register(...registerables);
defineComponent(LineChart);

// props
const props = defineProps({
  title: { type: String, default: '' },
});

// inject
const lineData = inject(
  'chartData',
  [] as ChartData<'line'>
) as ChartData<'line'>;
console.log(lineData);
// data

// computed
const dataLabels = computed(() => {
  return lineData.map((e) => e.label);
});

const chartData = computed<ChartData<'line'>>(() => ({
  labels: dataLabels.value,
  datasets: lineData,
}));

const options = computed<ChartOptions<'line'>>(() => ({
  plugins: {
    legend: {
      display: true,
    },
  },
}));

const { lineChartProps } = useLineChart({
  chartData: chartData.value,
  options,
});
</script>
