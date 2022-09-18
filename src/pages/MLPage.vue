<template>
  <q-page padding>
    <q-stepper
      v-model="curStep"
      ref="stepper"
      color="primary"
      animated
      keep-alive
      alternative-labels
    >
      <q-step
        v-for="(step, idx) in steps"
        :key="`step_${idx}`"
        :name="idx"
        :title="step['title']"
        :icon="step['icon'] ?? 'question_mark'"
        :done="curStep > idx"
      >
        <component :is="step['component']"></component>
      </q-step>
      <template #navigation>
        <q-stepper-navigation>
          <q-btn
            @click="isFinalStep ? submit : (curStep += 1)"
            color="primary"
            :label="isFinalStep ? 'Finish' : 'Continue'"
          />
          <q-btn
            v-if="curStep > 0"
            flat
            color="primary"
            @click="curStep -= 1"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-page>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import LayerBuild from '../components/ml/LayerBuild.vue';
import FileUploader from '../components/FileUploader.vue';
import EnvSetting from '../components/ml/envSetting.vue';

let curStep = ref(0);

interface Stepper {
  name: string;
  title: string;
  icon?: string;
  data: unknown;
  component: unknown;
}

const isFinalStep = computed(() => curStep.value === steps.length-1);
const steps = reactive<Array<Stepper>>([
  {
    name: 'EnvSetting',
    title: '環境設定',
    icon: 'settings_applications',
    component: EnvSetting,
    data: { framework: '', isPretrained: false },
  },
  {
    name: 'FileUpload',
    title: '檔案上傳',
    icon: 'upload',
    component: FileUploader,
    data: null,
  },
  {
    name: 'LayerBuild',
    title: '建立模型',
    icon: 'model_training',
    component: LayerBuild,
    data: [],
  },
]);

const submit = () => {
  console.log('Submit');
};
</script>
