<template>
  <div class="row q-col-gutter-md">
    <div v-for="(layer, idx) in layers" :key="`Layer_${idx}`" class="col-4">
      <LayerCard :title="`Layer${idx}`" :data="layer" @del="del" />
    </div>
  </div>
  <q-page-sticky position="bottom-right" :offset="[10, 10]">
    <q-btn round color="secondary" icon="add" @click="add" />
  </q-page-sticky>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import LayerCard from './LayerCard.vue';
import { Layer } from '@/models/model';

const layers = reactive<Array<Layer>>([]);
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
  };
  console.log('add');
  layers.push(newItem);
};

const del = (id: string) => {
  const targetIdx = layers.findIndex((e) => e.id === id);
  layers.splice(targetIdx, 1);
  console.log(`--- remove id: ${id} from layers---`);
  console.log(layers);
};
</script>
