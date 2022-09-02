<template>
  <q-dialog v-model="dialog">
    <q-card class="dialog">
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
          <div class="row q-gutter-lg">
            <div class="col">
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
            </div>
            <div class="col">
              <q-input
                v-model="selected.content"
                label="Content"
                :rules="[contentRequired]"
              />
            </div>
          </div>
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
import { computed, reactive, PropType } from 'vue';
import { uid } from 'quasar';
import { useTodoStore } from 'stores/todo';
import _ from 'lodash';
import { Todo, Status } from 'src/models/todo';
import { DialogMode } from 'src/models/dialog';

const props = defineProps({
  isOpen: Boolean,
  mode: Number, // enum dialgo mode
  data: Object as PropType<Todo>,
});

const emit = defineEmits(['close', 'submit']);
const close = () => {
  emit('close');
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
let selected = reactive(
  _.cloneDeep(
    props.data ?? {
      id: '',
      content: '',
      status: Status['not yet'],
    }
  )
);

const dialog = computed(() => props.isOpen);
const mode = computed(() => props.mode);
const title = computed(() => modes[mode.value ?? 2].title);
const statusOption = computed(() => store.status);

const statusRequired = (obj: object): boolean | string => {
  return _.isNumber(obj) ? true : '必選';
};
const contentRequired = (val: string) => {
  return _.isString(val) ? true : '必填';
};

const submit = () => {
  if (mode.value === DialogMode.add) {
    const id = uid();
    emit('submit', { ...selected, id });
  } else if (mode.value === DialogMode.edit) {
    emit('submit', { ...selected, originStatusTag: props.data?.status });
  }
  close();
};
</script>

<style scoped lang="scss">
.dialog {
  min-width: 500px;
  max-width: 100%;
}
</style>
