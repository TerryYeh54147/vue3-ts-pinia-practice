<template>
  <VueFlow
    v-model="elements"
    snap-to-grid
    elevate-edges-on-select
    class="vueflow"
  >
    <template #node-custom="props">
      <LayerCard
        :key="props.id"
        :title="`Layer_${props.id}`"
        :data="props.data"
        :type="getType(props.id)"
        @update="updateLayer"
        @del="delLayer"
      ></LayerCard>
    </template>
    <Background />
    <MiniMap />
    <div class="controls">
      <q-btn round color="secondary" icon="add" @click="add" />
    </div>
  </VueFlow>
</template>

<script setup lang="ts">
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { Background, MiniMap } from '@vue-flow/additional-components';
import type { Element } from '@vue-flow/core';

import { ref } from 'vue';
import { uid } from 'quasar';
import LayerCard from './LayerCard.vue';
import _ from 'lodash';
/**
 * useVueFlow provides all event handlers and store properties
 * You can pass the composable an object that has the same properties as the VueFlow component props
 */
const vueflowConfig = {
  defaultZoom: 0.5,
  minZoom: 0.4,
  maxZoom: 5,
};

const { onPaneReady, onNodeDragStop, onConnect, addEdges } =
  useVueFlow(vueflowConfig);

const getType = (id: string) => {
  const idx = elements.value.findIndex((e) => e.id === id);
  const type = idx === 0 ? 'input' : 'others';
  return type;
};

/**
 * Our elements
 */
const elements = ref<Array<Element>>([
  {
    id: '1',
    position: { x: 0, y: 50 },
    type: 'custom',
    data: {
      class: '',
      id: '1',
    },
  },
]);

/**
 * This is a Vue Flow event-hook which can be listened to from anywhere you call the composable, instead of only on the main component
 *
 * onPaneReady is called when viewpane & nodes have visible dimensions
 */
onPaneReady(({ fitView }) => {
  fitView();
});

onNodeDragStop((e) => console.log('drag stop', e));

/**
 * onConnect is called when a new connection is created.
 * You can add additional properties to your new edge (like a type or label) or block the creation altogether
 */
onConnect((params) => {
  console.log('onConnect');
  console.log(params);
  addEdges([params]);
});

const emit = defineEmits(['update']);

function updateLayer(newItem: Element) {
  const targetIdx = elements.value.findIndex((e) => e.id === newItem.id);
  elements.value[targetIdx] = newItem;
  emit('update', elements.value);
}

function delLayer(id: string) {
  const targetIdx = elements.value.findIndex((e) => e.id === id);
  elements.value.splice(targetIdx, 1);
  console.log(`--- remove id: ${id} from elements---`);
  console.log(elements.value);
}

const getNextId = () => {
  const id = uid();
  const timeStamp = new Date().getTime().toString() + `_${id}`;
  return timeStamp;
};

function add() {
  const id = getNextId();
  const newItem: Element = {
    id,
    position: { x: _.random(100, 500), y: _.random(100, 500) },
    type: 'custom',
    data: {
      class: '',
      id,
      params: {},
    },
  };
  console.log('=== add ===');
  elements.value.push(newItem);
}
</script>

<style lang="scss" scoped>
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.2.0/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.2.0/dist/theme-default.css';

.vueflow {
  height: calc(100vh - 52px - 244px);
  .controls {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 4;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
  }
  button {
    &:hover {
      opacity: 0.8;
      transform: scale(105%);
      transition: 0.25s all ease;
    }
  }
}

.vue-flow__minimap {
  transform: scale(75%);
  transform-origin: bottom right;
}
</style>
