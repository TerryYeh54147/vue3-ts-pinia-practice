<template>
  <div class="row justify-around q-col-gutter-md">
    <div class="col-12 col-md-6">
      <q-select
        v-model="setting.framework"
        :options="options.framework"
        label="framework"
        dense
      />
    </div>
    <div class="col-12 col-md-6">
      <q-toggle v-model="setting.isPretrained" label="isPretrained" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, PropType, onDeactivated } from 'vue';
import _ from 'lodash';
import { EnvSetting } from '../../models/model';

const props = defineProps({
  data: Object as PropType<EnvSetting>,
});

// let setting = reactive<EnvSetting>({ framework: '', isPretrained: false });
const setting = reactive<EnvSetting>(_.cloneDeep(props.data) as EnvSetting);
const options = {
  framework: ['Tensorflow & Keras'],
};

const emit = defineEmits(['update']);
onDeactivated(() => {
  console.log('onDeactivated');
  emit('update', setting);
});
</script>
