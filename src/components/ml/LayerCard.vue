<template>
  <q-card>
    <q-card-section>
      <div class="row">
        <div class="col-11">
          <div class="text-h6 text-blod">
            {{ title }}
          </div>
        </div>
        <div class="col-1">
          <q-btn flat round dense icon="close" color="red" @click="del" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType, computed } from 'vue';
import { Layer } from '@/models/model';

const props = defineProps({
  title: String,
  data: Object as PropType<Layer>,
});

const emit = defineEmits(['del']);
const layer = computed(() => props.data);

const del = () => {
  console.log(`delete ${layer.value?.id}`);
  emit('del', layer.value?.id);
};
</script>
