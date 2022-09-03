<template>
  <q-drawer v-model="isDrawerOpen" bordered>
    <q-list>
      <q-item
        v-for="item in drawerItems"
        :key="`drawer_item_${item.title}`"
        :to="item.path"
        clickable
      >
        <q-item-section v-if="item.icon" avatar>
          <q-icon :name="item.icon" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ item.title }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
interface Drawer {
  title: string;
  path: string;
  icon: string;
}
const isDrawerOpen = ref(false);
const drawerItems = reactive<Array<Drawer>>([
  {
    title: 'Home',
    path: '/',
    icon: 'home',
  },{
    title: 'ML',
    path: '/ml-platform',
    icon: 'model_training',
  },
]);
</script>
