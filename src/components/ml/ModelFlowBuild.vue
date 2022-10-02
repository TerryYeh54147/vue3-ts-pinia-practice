<template>
  <VueFlow v-model="elements" :default-zoom="1.5" :min-zoom="0.2" :max-zoom="4">
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
    <Controls />
    <q-page-sticky
      position="top-right"
      :offset="[18, 10]"
      class="pageStickyBtn"
    >
      <q-btn round color="secondary" icon="add" @click="add" />
    </q-page-sticky>
  </VueFlow>
</template>

<script setup lang="ts">
import {
  Background,
  Controls,
  MiniMap,
  VueFlow,
  isNode,
  useVueFlow,
} from '@braks/vue-flow';
import type { Element } from '@braks/vue-flow';

import { ref } from 'vue';
import LayerCard from './LayerCard.vue';
import _ from 'lodash';

/**
 * useVueFlow provides all event handlers and store properties
 * You can pass the composable an object that has the same properties as the VueFlow component props
 */
const {
  onPaneReady,
  onNodeDragStop,
  onConnect,
  addEdges,
  setTransform,
  toObject,
} = useVueFlow();

const getType = (id: string) => {
  const idx = elements.value.findIndex((e) => e.id === id);
  console.log(`${id}: idx: ${idx}`);
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
onConnect((params) => addEdges([params]));

const dark = ref(false);

/**
 * To update node properties you can simply use your elements v-model and mutate the elements directly
 * Changes should always be reflected on the graph reactively, without the need to overwrite the elements
 */
const updatePos = () =>
  elements.value.forEach((el) => {
    if (isNode(el)) {
      el.position = {
        x: Math.random() * 400,
        y: Math.random() * 400,
      };
    }
  });

/**
 * toObject transforms your current graph data to an easily persist-able object
 */
const logToObject = () => console.log(toObject());

/**
 * Resets the current viewpane transformation (zoom & pan)
 */
const resetTransform = () => setTransform({ x: 0, y: 0, zoom: 1 });

const toggleClass = () => {
  dark.value = !dark.value;
  elements.value.forEach((el) => (el.class = dark.value ? 'dark' : 'light'));
};

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
  const timeStamp = new Date().getTime().toString();
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
@import 'https://cdn.jsdelivr.net/npm/@braks/vue-flow@0.4.40/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@braks/vue-flow@0.4.40/dist/theme-default.css';

.pageStickyBtn {
  z-index: 10;
}
</style>
