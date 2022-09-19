<template>
  <div
    class="row"
    v-for="([key, val], i) in Object.entries(content as modelSelected)"
    :key="`data_${i}`"
  >
    {{ key }}: {{ val }}
  </div>
  <q-separator class="q-my-lg" />
  <div class="row">確認送出嗎？</div>
</template>

<script setup lang="ts">
import { defineProps, PropType, computed } from 'vue';
import { modelSelected } from '../../models/model';
const props = defineProps({ data: Object as PropType<modelSelected> });
const content = computed(() => props.data);
</script>
