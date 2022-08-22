<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          :icon="leftDrawerOpen ? 'menu_open' : 'menu'"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          <q-btn flat rounded class="text-h6" @click="toHome">{{ appName }}</q-btn>
        </q-toolbar-title>
        <q-btn
          flat
          rounded
          :icon="isDarkMode ? 'dark_mode' : 'light_mode'"
          @click="switchDarkMode"
        />
      </q-toolbar>
    </q-header>

    <NavDrawer v-model="leftDrawerOpen" bordered />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

import NavDrawer from 'src/components/NavDrawer.vue';
import { useRouter } from 'vue-router';

const appName = 'Terry Practice';
const isDarkMode = ref(false);
const $q = useQuasar();
const router = useRouter();

const switchDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  $q.dark.set(isDarkMode.value);
};

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const toHome = () => router.push({ path: '/' });
</script>
