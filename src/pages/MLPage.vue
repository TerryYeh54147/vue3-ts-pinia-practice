<template>
  <q-page padding>
    <q-form
      ref="stepperForm"
      @submit="isFinalStep ? submit() : nextStep()"
      @reset="resetStep"
      :key="formKey"
    >
      <q-stepper
        v-model="curStep"
        ref="stepper"
        color="primary"
        animated
        keep-alive
        header-nav
        alternative-labels
        :key="stepKey"
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
            :key="stepKey"
            @update="updateData($event, step['label'])"
          ></component>
        </q-step>
        <template #navigation>
          <q-stepper-navigation>
            <q-btn
              type="submit"
              color="primary"
              :label="isFinalStep ? 'Submit' : 'Continue'"
            />
            <q-btn
              v-if="curStep > 0"
              flat
              color="primary"
              @click="backStep"
              label="Back"
              class="q-ml-sm"
            />
            <q-btn
              label="reset"
              type="reset"
              flat
              color="red"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template> </q-stepper
    ></q-form>
  </q-page>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  reactive,
  nextTick,
} from 'vue';
import { useModelLayerStore } from '../stores/model-layer-store';
import { uid, useQuasar } from 'quasar';
// import LayerBuild from '../components/ml/LayerBuild.vue';
import ModelFlowBuild from '../components/ml/ModelFlowBuild.vue';
import FileUploader from '../components/FileUploader.vue';
import EnvSetting from '../components/ml/EnvSetting.vue';
import FinalConfirm from '../components/ml/FinalConfirm.vue';
import { isValidKey } from '../utils/utils';
import _ from 'lodash';

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
    label: 'file',
    title: '檔案上傳',
    icon: 'upload',
    component: FileUploader,
    data: _.cloneDeep(modelLayerStore.modelLayerInputed.file),
  },
  {
    label: 'envSetting',
    title: '環境設定',
    icon: 'settings_applications',
    component: EnvSetting,
    data: _.cloneDeep(modelLayerStore.modelLayerInputed.envSetting),
  },
  {
    label: 'modelLayer',
    title: '建立模型',
    icon: 'model_training',
    // component: LayerBuild,
    component: ModelFlowBuild,
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
    file: steps[0].data,
    envSetting: steps[1].data,
    modelLayer: steps[2].data,
  };
});

onMounted(() => {
  const id = uid();
  modelLayerStore.modelLayerInputed.uid = id;
});

const updateData = (data, label: string) => {
  const target = steps.find((e) => e.label === label);
  if (target) {
    target.data = data;
  }
};

const stepperForm = ref(null);
let formKey = ref(0);

const nextStep = () => {
  console.log(`stepperForm:`);
  console.log(stepperForm.value);
  curStep.value += 1;
  console.log(isFinalStep.value);
  if (isFinalStep.value) {
    steps[steps.length - 1].data = _.cloneDeep(selectedData.value);
  }
};

const backStep = () => {
  stepperForm.value.validate().then((pass: boolean) => {
    if (pass && curStep.value > 0) {
      curStep.value -= 1;
    } else {
      const errMsg = !pass ? 'validation failed' : 'something wrong';
      console.error(errMsg);
    }
  });
};

let stepKey = ref(0);
const resetStep = () => {
  steps.forEach((e) => {
    if (isValidKey(e.label, modelLayerStore.modelLayerDefaultInputed)) {
      e.data = modelLayerStore.modelLayerDefaultInputed[e.label];
    }
  });
  modelLayerStore.syncLayerModelLayerInputed(
    modelLayerStore.modelLayerDefaultInputed
  );
  curStep.value = 0;
  nextTick(() => {
    stepKey.value++;
    formKey.value++;
  });
};

const submit = () => {
  modelLayerStore.syncLayerModelLayerInputed(selectedData.value);
  console.log(JSON.stringify(selectedData.value));
  resetStep();
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
