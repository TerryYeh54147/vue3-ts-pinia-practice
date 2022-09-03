<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-blod">{{ title }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
});
</script>
