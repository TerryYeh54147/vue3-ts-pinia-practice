<template>
  <q-dialog v-model="dialog" full-width>
    <q-card>
      <q-card-section class="no-padding">
        <q-toolbar class="bg-primary">
          <q-toolbar-title class="text-white text-bold">{{
            title
          }}</q-toolbar-title>
          <q-btn rounded flat @click="close"
            ><q-icon name="close"
          /></q-btn> </q-toolbar
      ></q-card-section>
      <q-form @submit="submit">
        <q-card-section>
          <q-select
            v-model="selected.status"
            use-chips
            label="Status"
            :options="statusOption"
            lazy-rules
            emit-value
            map-options
            :rules="[statusRequired]"
          />
          <q-input
            v-model="selected.content"
            label="Content"
            :rules="[contentRequired]"
          ></q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat rounded type="submit"
            ><q-icon name="send" color="primary"
          /></q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { uid } from 'quasar';
import { useTodoStore } from 'stores/todo';
import _ from 'lodash';

const props = defineProps({
  isOpen: Boolean,
  mode: Number, // enum dialgo mode
});

const emit = defineEmits(['close', 'submit']);
const close = () => {
  console.log('close dialog');
  emit('close');
};
const submit = () => {
  const id = uid();
  console.log('submit');
  emit('submit', { ...selected, id });
  close();
};

const modes = [
  {
    label: 'add',
    title: '新增',
  },
  {
    label: 'edit',
    title: '編輯',
  },
  {
    label: 'others',
    title: '其他',
  },
];
const store = useTodoStore();
const selected = reactive({
  status: null,
  content: null,
});

const dialog = computed(() => props.isOpen);
const mode = computed(() => props.mode);
const title = computed(() => modes[mode.value ?? 2].title);
const statusOption = computed(() => store.status);

const statusRequired = (obj: object) => {
  console.log('statusRequired');
  console.log(obj, _.isEmpty(obj));
  return _.isNumber(obj) ? true : '必選';
};
const contentRequired = (val: string) => {
  return _.isString(val) ? true : '必填';
};

</script>
