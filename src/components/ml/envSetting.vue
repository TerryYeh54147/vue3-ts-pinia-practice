<template>
  <div class="row justify-around q-col-gutter-md">
    <div class="col-12 col-md-6">
      <q-select v-model="setting.framework" :options="options.framework" label="framework" dense />
    </div>
    <div class="col-12 col-md-6">
      <q-toggle v-model="setting.isPretrained" label="isPretrained" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

interface EnvSetting {
  framework: string;
  isPretrained: boolean;
}

const setting = reactive<EnvSetting>({ framework: '', isPretrained: false });
const options = {
  framework: ['Tensorflow & Keras'],
}
</script>
