<template>
  <div>
    確認送出嗎？
    <!-- {{ data }} -->
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, computed } from 'vue';
import { modelSelected } from '../../models/model';
const props = defineProps({ content: Object as PropType<modelSelected> });
const data = computed(() => JSON.stringify(props.content));
</script>
