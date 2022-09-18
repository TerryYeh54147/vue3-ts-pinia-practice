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
        <component
          :is="step['component']"
          :data="step['data']"
          @update="updateData($event, step['label'])"
        ></component>
      </q-step>
      <template #navigation>
        <q-stepper-navigation>
          <q-btn
            @click="isFinalStep ? submit() : nextStep()"
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
import { reactive, ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useModelLayerStore } from '../stores/model-layer-store';
import { uid, useQuasar } from 'quasar';
import LayerBuild from '../components/ml/LayerBuild.vue';
import FileUploader from '../components/FileUploader.vue';
import EnvSetting from '../components/ml/envSetting.vue';
import FinalConfirm from '../components/ml/FinalConfirm.vue';
// import { isValidKey } from '../utils/utils';
import _ from 'lodash';
// import { isValidKey } from '@/utils/utils';

let curStep = ref(0);

interface Stepper {
  label: string;
  title: string;
  icon?: string;
  data: unknown;
  component: unknown;
}

const modelLayerStore = useModelLayerStore();
const isFinalStep = computed(() => curStep.value === steps.length - 1);
const steps = reactive<Array<Stepper>>([
  {
    label: 'envSetting',
    title: '環境設定',
    icon: 'settings_applications',
    component: EnvSetting,
    data: _.cloneDeep(modelLayerStore.modelLayerInputed.envSetting),
  },
  {
    label: 'file',
    title: '檔案上傳',
    icon: 'upload',
    component: FileUploader,
    data: _.cloneDeep(modelLayerStore.modelLayerInputed.file),
  },
  {
    label: 'modelLayer',
    title: '建立模型',
    icon: 'model_training',
    component: LayerBuild,
    data: _.cloneDeep(modelLayerStore.modelLayerInputed.modelLayer),
  },
  {
    label: 'comfirm',
    title: '確認資訊',
    icon: 'info',
    component: FinalConfirm,
    data: null,
  },
]);
const selectedData = computed(() => {
  return {
    uid: modelLayerStore.modelLayerInputed.uid,
    envSetting: steps[0].data,
    file: steps[1].data,
    modelLayer: steps[2].data,
  };
});
onMounted(() => {
  const id = uid();
  modelLayerStore.modelLayerInputed.uid = id;
  console.log(steps.map((e) => e.data));
  console.log(Object.values(modelLayerStore.modelLayerDefaultInputed));
  console.log(Object.values(modelLayerStore.modelLayerInputed));
});

const updateData = (data, label: string) => {
  const target = steps.find((e) => e.label === label);
  if (target) {
    target.data = data;
  }
};

const nextStep = () => {
  curStep.value += 1;
  console.log(isFinalStep.value);
  if (isFinalStep.value) {
    steps[steps.length - 1].data = _.cloneDeep(selectedData.value);
  }
};

const submit = () => {
  console.log('Submit');
  modelLayerStore.syncLayerModelLayerInputed(selectedData.value);
};

onBeforeUnmount(() => {
  console.log('onBeforeMount');
  useQuasar().notify({
    message: '需要暫存 Model Layers 嗎？',
    color: 'black',
    actions: [
      {
        label: '儲存',
        color: 'positive',
        handler: () => {
          modelLayerStore.syncLayerModelLayerInputed(selectedData.value);
        },
      },
      {
        label: '清除',
        color: 'negative',
        handler: () => {
          console.log('initial model layers');
          modelLayerStore.syncLayerModelLayerInputed(
            modelLayerStore.modelLayerDefaultInputed
          );
        },
      },
    ],
  });
});
</script>
