<template>
  <div class="row q-col-gutter-md items-stretch">
    <div v-for="(layer, idx) in layers" :key="`Layer_${layer.id}`" class="col-6">
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
import { reactive, onDeactivated } from 'vue';
import LayerCard from './LayerCard.vue';
import { Layer } from '../../models/model';
import _ from 'lodash';

const props = defineProps({
  data: Array,
});

let layers = reactive<Array<Layer>>(
  _.cloneDeep(props.data) as unknown as Array<Layer>
);

const getNextId = () => {
  const timeStamp = new Date().getTime().toString();
  return timeStamp;
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
};

const update = (newItem: Layer) => {
  const targetIdx = layers.findIndex((e) => e.id === newItem.id);
  layers[targetIdx] = newItem;
  emit('update', layers);
};

const del = (id: string) => {
  const targetIdx = layers.findIndex((e) => e.id === id);
  layers.splice(targetIdx, 1);
  console.log(`--- remove id: ${id} from layers---`);
  console.log(layers);
};

const emit = defineEmits(['update']);
onDeactivated(() => {
  console.log('onDeactivated');
  emit('update', layers);
});
</script>
