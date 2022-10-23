<template>
  <q-card class="layerCard">
    <q-card-section>
      <div class="row q-col-qutter-md">
        <div class="col-11">
          <div class="text-h6 text-blod">
            {{ isInputType? 'Input Layer': title }}
          </div>
        </div>
        <div class="col-1">
          <q-btn flat round dense icon="close" color="red" @click="del" />
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row q-col-qutter-md">
        <div class="col-12">
          <q-select
            v-model="input.class"
            label="class"
            :options="Object.keys(kerasAPI)"
            :rules="[isRequired]"
            lazy-rules
            clearable
            @update:model-value="update('class')"
          />
        </div>
      </div>
      <div
        v-if="isValidKey(input.class, kerasAPI)"
        class="row q-col-qutter-lg fit wrap"
      >
        <!-- <div v-for="(a, i) in kerasAPI[input.class]['params']" :key="`params_${i}`" class="col-6">
          {{ a['label']}}
        </div> -->

        <div
          v-for="(param, p_idx) in kerasAPI[input.class]['params']"
          :key="`param_${p_idx}`"
          :class="param['class'] ?? `col-12 col-md-6 `"
        >
          <q-input
            v-if="param['inputType'] === InputType.text"
            v-model="input['params'][param['label']]"
            :label="param['label']"
            :hint="param['hint']"
            :placeholder="param['placeholder']"
            clearable
            class="q-mr-md"
            @change="update(param['label'])"
          ></q-input>
          <q-select
            v-if="param['inputType'] === InputType.select"
            v-model="input['params'][param['label']]"
            :label="param['label']"
            :options="kerasAPIOtions[param['option']]"
            :hint="param['hint']"
            clearable
            class="q-mr-md"
            @update:model-value="update(param['label'])"
          ></q-select>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <Handle
    v-if="!isInputType"
    id="sourceEdge"
    type="source"
    :position="Position.Top"
    :style="sourceHandleStyle"
  />
  <Handle
    id="targetEdge"
    type="target"
    :position="Position.Bottom"
    :style="targetHandleStyle"
  />
</template>

<script setup lang="ts">
import { PropType, computed, reactive } from 'vue';
import _ from 'lodash';
import { useModelLayerStore } from '../../stores/model-layer-store';
import { isValidKey } from '../../utils/utils';
import { InputType, Layer } from '../../models/model';
import { isRequired } from '../../utils/rules';
import { Handle, Position } from '@vue-flow/core';

const modelLayerStore = useModelLayerStore();

const props = defineProps({
  title: String,
  data: Object as PropType<Layer>,
  type: String,
});

const emit = defineEmits(['del', 'update']);
const layer = computed(() => props.data);

const isInputType = computed(() => {
  return props.type === 'input';
});

const kerasAPI = modelLayerStore.kerasAPI;
const kerasAPIOtions = modelLayerStore.kerasAPIOtions;
let input = reactive<Layer>(_.cloneDeep(props.data) as Layer);

const update = (label: string) => {
  console.log(`update: ${label} field`);
  if (label === 'class') {
    input.params = {};
  }
  emit('update', input);
};
const del = () => {
  console.log(`=== delete ${layer.value?.id} ===`);
  emit('del', layer.value?.id);
};

const sourceHandleStyle = computed(() => ({
  filter: 'invert(100%)',
  top: '-3px',
  bottom: 'auto',
}));
const targetHandleStyle = computed(() => ({
  filter: 'invert(100%)',
  top: 'auto',
  bottom: '-3px',
}));
</script>

<style scoped lang="scss">
.layerCard {
  min-width: 300px;
  width: 500px;
}
</style>
