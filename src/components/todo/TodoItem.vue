<template>
  <!-- <q-item-section avatar v-if="todo">
    <q-avatar>
      <q-icon
        :name="statusMapping[todo.status].icon ?? 'question_mark'"
        :color="statusMapping[todo.status].color ?? 'grey'" /></q-avatar
  ></q-item-section> -->
  <q-item-section
    >{{ isTodoEmpty ? 'no content' : todo?.content }}
  </q-item-section>
  <q-item-section side v-if="todo">
    <q-btn flat rounded @click="del" color="red"><q-icon name="close" /></q-btn>
  </q-item-section>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { Todo } from 'src/models/todo';
import _ from 'lodash';
// import { useTodoStore } from 'src/stores/todo';

const props = defineProps({
  item: Object as PropType<Todo>,
});

const emit = defineEmits(['del']);
const del = () => emit('del', todo.value?.id);

// const store = useTodoStore();
// const statusMapping = computed(() => store.status);

const todo = computed(() => _.cloneDeep(props.item));
const isTodoEmpty = computed(() => _.isEmpty(todo));
</script>
