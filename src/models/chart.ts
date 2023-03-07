export enum ChartType {
  'bar' = 'BarChart',
  'doughnut' = 'DoughnutChart',
  'line' = 'LineChart',
  'pie' = 'PieChart',
  'polarArea' = 'PolarAreaChart',
  'radar' = 'RadarChart',
  'bubble' = 'BubbleChart',
  'scatter' = 'ScatterChart',
}

export interface DounghChartData {
  label: string;
  backgroundColor?: string;
  value: number | Array<string | number>;
}

export interface LineChartData {
  label: string;
  borderColor?: string;
  data: Array<string | number>;
  fill: boolean;
}
