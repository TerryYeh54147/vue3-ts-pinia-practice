<template>
  <div class="row justify-around q-col-gutter-md">
    <div class="col-12 col-md-6">
      <q-select
        v-model="setting.framework"
        :options="options.framework"
        label="framework"
        :rules="[isRequired]"
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
import { EnvSetup } from '../../models/model';
import { isRequired } from '../../utils/rules';

const props = defineProps({
  data: Object as PropType<EnvSetup>,
});

// let setting = reactive<EnvSetup>({ framework: '', isPretrained: false });
const setting = reactive<EnvSetup>(_.cloneDeep(props.data) as EnvSetup);
const options = {
  framework: ['Tensorflow & Keras'],
};

const emit = defineEmits(['update']);
onDeactivated(() => {
  console.log('onDeactivated');
  emit('update', setting);
});
</script>
