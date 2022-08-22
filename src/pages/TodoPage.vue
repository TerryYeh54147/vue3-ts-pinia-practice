<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <q-list separator>
          <q-item v-for="item in todos" :key="item.id" clickable v-ripple>
            <TodoItem :item="item" @del="del" />
          </q-item>
        </q-list>
      </q-card-section> </q-card
    ><q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="add"
        color="secondary"
        @click="openDialog(DialogMode.add)"
      /> </q-page-sticky
  ></q-page>
  <ItemDialog
    :key="dialog.key"
    :is-open="dialog.isOpen"
    :mode="dialog.mode"
    @close="dialog.isOpen = !dialog.isOpen"
    @submit="updateTodos(dialog.mode, $event)"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useTodoStore } from 'src/stores/todo';
import _ from 'lodash';
import { useQuasar } from 'quasar';

import type { Todo, InputDialogProps } from 'components/models';
import { DialogMode } from 'components/models';
import TodoItem from 'components/todo/TodoItem.vue';
import ItemDialog from 'components/todo/ItemDialog.vue';

import { onBeforeRouteLeave } from 'vue-router';

const $q = useQuasar();

const store = useTodoStore();
const dialog = reactive<InputDialogProps>({
  key: 0,
  isOpen: false,
  mode: DialogMode.others,
});

let todos = reactive<Array<Todo>>(_.cloneDeep(store.todo));

const openDialog = (mode: DialogMode) => {
  dialog.key++;
  dialog.isOpen = true;
  dialog.mode = mode;
};

// test
const updateTodos = (mode: DialogMode, data: Todo) => {
  console.log('updateTodos');
  console.log(mode);
  console.log(data);
  if (mode === DialogMode.add) {
    todos.push(data);
  } else if (mode === DialogMode.edit) {
    console.warn('no support this function yet');
  } else {
    console.error('unexpected mode');
  }
};

const del = (id: string) => {
  const targetIdx = todos.findIndex((e) => e.id === id);
  todos.splice(targetIdx, 1);
};

const saveCheckBeforeLeave = () => {
  $q.notify({
    message: '離開前是否要存檔',
    actions: [
      {
        label: '存檔',
        color: 'positive',
        handler: () => {
          store.setTodo(todos);
          console.log('save current todo list');
        },
      },
      {
        label: '取消',
        color: 'warning',
        handler: () => {
          console.log('dismiss');
        },
      },
    ],
  });
};

onBeforeRouteLeave(() => {
  console.log('onBeforeRouteLeave');
  saveCheckBeforeLeave();
  // return true;
});
</script>
