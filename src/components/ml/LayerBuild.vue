<template>
  <div class="row q-col-gutter-md items-stretch">
    <div v-for="(layer, idx) in layers" :key="`Layer_${idx}`" class="col-6">
      <LayerCard
        :title="`Layer${idx}`"
        :data="layer"
        @update="update"
        @del="del"
      />
    </div>
  </div>
  <q-page-sticky position="bottom-right" :offset="[18, 10]">
    <q-btn round color="secondary" icon="add" @click="add" />
  </q-page-sticky>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { uid } from 'quasar';
import LayerCard from './LayerCard.vue';
import { Layer } from '../../models/model';
import { useModelLayerStore } from '../../stores/model-layer-store';
import _ from 'lodash';

const modelLayerStore = useModelLayerStore();
let layers = reactive<Array<Layer>>(
  _.cloneDeep(modelLayerStore.modelLayerInputed.modelLayer)
);

onMounted(() => {
  const id = uid();
  modelLayerStore.modelLayerInputed.uid = id;
});
let globalCnt = ref(0);

const getNextId = () => {
  globalCnt.value++;
  return globalCnt.value.toString();
};

const add = () => {
  const id = getNextId();
  const newItem: Layer = {
    id,
    label: `Layer ${id}`,
    class: '',
    params: {},
  };
  console.log('=== add ===');
  layers.push(newItem);
  console.log(layers);
  modelLayerStore.syncLayer(layers);
  console.log(JSON.stringify(modelLayerStore.modelLayerInputed));
};

const update = (newItem: Layer) => {
  const targetIdx = layers.findIndex((e) => e.id === newItem.id);
  layers[targetIdx] = newItem;
  modelLayerStore.syncLayer(layers);
};

const del = (id: string) => {
  const targetIdx = layers.findIndex((e) => e.id === id);
  layers.splice(targetIdx, 1);
  console.log(`--- remove id: ${id} from layers---`);
  console.log(layers);
  modelLayerStore.syncLayer(layers);
};
</script>
