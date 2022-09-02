<template>
  <q-page padding>
    <div class="row q-gutter-md">
      <!-- TODO: make the following part to be a view components -->
      <div
        class="col"
        v-for="(tag, idx) in statusTags"
        :key="`statusTags: ${idx}`"
      >
        <q-card>
          <q-card-section>
            <q-chip clickable @click="openDialog(DialogMode.add, {...defaultTodo, ...{status: idx}})"
              ><q-avatar :icon="getIcon(tag)" :color="getIconColor(tag)" />{{
                tag
              }}</q-chip
            >
            <q-list separator>
              <q-item
                v-for="item in todoList[tag]"
                :key="item.id"
                clickable
                v-ripple
                @click="openDialog(DialogMode.edit, item)"
              >
                <TodoItem :item="item" @del="del(tag, $event)" />
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="add"
        color="secondary"
        @click="openDialog(DialogMode.add, defaultTodo)"
      /> </q-page-sticky
  ></q-page>
  <ItemDialog
    :key="dialog.key"
    :is-open="dialog.isOpen"
    :mode="dialog.mode"
    :data="dialog.input"
    @close="dialog.isOpen = !dialog.isOpen"
    @submit="updateTodos(dialog.mode, $event)"
  />
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useTodoStore } from 'src/stores/todo';
import _ from 'lodash';
import { useQuasar } from 'quasar';

import { TodoList, Todo, Status } from 'src/models/todo';
import { DialogMode, InputDialogProps } from 'src/models/dialog';
import TodoItem from 'components/todo/TodoItem.vue';
import ItemDialog from 'components/todo/ItemDialog.vue';

import { onBeforeRouteLeave } from 'vue-router';
const test = () => console.log('test click');
const $q = useQuasar();

const store = useTodoStore();

const defaultTodo = {
  id: '',
  content: '',
  status: Status['not yet'],
};
const dialog = reactive<InputDialogProps>({
  key: 0,
  isOpen: false,
  mode: DialogMode.others,
  input: defaultTodo,
});

let todoList = reactive<TodoList>(_.cloneDeep(store.todoList));
const statusTags = computed(() => Object.keys(todoList));
const statusMapping = computed(() => store.status);

const openDialog = (mode: DialogMode, data: Todo = defaultTodo) => {
  dialog.key++;
  dialog.isOpen = true;
  dialog.mode = mode;
  dialog.input = data;
};

const getIcon = (key: string) => {
  return (
    statusMapping.value.find((e) => key === e.label)?.icon ?? 'question_mark'
  );
};
const getIconColor = (key: string) => {
  return statusMapping.value.find((e) => key === e.label)?.color ?? 'grey';
};
const getStatusString = (statusIdx: number): string =>
  statusMapping.value[statusIdx].label;
const isInStatusTypeRange = (statusIdx: number): boolean => {
  return statusIdx >= 0 && statusIdx < statusMapping.value.length;
};

const updateTodos = (mode: DialogMode, data: Todo) => {
  const statusTag = getStatusString(data.status);
  const targetArr = todoList[statusTag];
  if (mode === DialogMode.add) {
    console.log('---add item---');
    targetArr.push(data);
  } else if (mode === DialogMode.edit) {
    let targetIdx = targetArr.findIndex((e) => e.id === data.id);
    console.log('---edit item---');
    if (targetIdx >= 0) {
      todoList[statusTag][targetIdx] = data;
    } else {
      todoList[statusTag].push(data);
      if (
        _.isNumber(data.originStatusTag) &&
        isInStatusTypeRange(data.originStatusTag)
      ) {
        const originTag: number = data.originStatusTag;
        const originStatusTag = getStatusString(originTag);
        del(originStatusTag, data.id);
      }
    }
  } else {
    console.error('unexpected mode');
  }
  console.log(data);
};

const del = (statusTag: string, id: string) => {
  console.log(`del item: ${id}`);
  const targetIdx = todoList[statusTag].findIndex((e) => e.id === id);
  todoList[statusTag].splice(targetIdx, 1);
};

const saveCheckBeforeLeave = () => {
  $q.notify({
    message: '離開前是否要存檔',
    actions: [
      {
        label: '存檔',
        color: 'positive',
        handler: () => {
          store.setTodo(todoList);
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
  console.log('onBeforeRouteLeave: TodoPage');
  saveCheckBeforeLeave();
});
</script>
