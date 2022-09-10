<template>
  <q-card>
    <q-card-section>
      <div class="row q-col-qutter-md">
        <div class="col-11">
          <div class="text-h6 text-blod">
            {{ title }}
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
            clearable
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
            @change="update(param['label'])"
          ></q-select>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { PropType, computed, reactive } from 'vue';
import _ from 'lodash';
import { useModelLayerStore } from '../../stores/model-layer-store';
import { isValidKey } from '../../utils/utils';
import { InputType, Layer } from '../../models/model';

const modelLayerStore = useModelLayerStore();

const props = defineProps({
  title: String,
  data: Object as PropType<Layer>,
});

const emit = defineEmits(['del', 'update']);
const layer = computed(() => props.data);

const kerasAPI = modelLayerStore.kerasAPI;
const kerasAPIOtions = modelLayerStore.kerasAPIOtions;
let input = reactive<Layer>(_.cloneDeep(props.data) as Layer);

const update = (label: string) => {
  console.log(`update: ${label} field`);
  emit('update', input);
};
const del = () => {
  console.log(`=== delete ${layer.value?.id} ===`);
  emit('del', layer.value?.id);
};
</script>
