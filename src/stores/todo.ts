import { defineStore } from 'pinia';
import { Status, Todo } from 'components/models';
import { reactive } from 'vue';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todo: reactive<Array<Todo>>([
      // temp for test
      {
        id: '1',
        content: 'todo 1',
        status: Status['not yet'],
      },
      {
        id: '2',
        content: 'todo 2',
        status: Status.doing,
      },
      {
        id: '3',
        content: 'todo 3',
        status: Status.done,
      },
    ]),
    status: [
      {
        label: 'not yet',
        value: Status['not yet'],
        icon: 'pending',
        color: 'grey',
      },
      {
        label: 'doing',
        value: Status.doing,
        icon: 'fast_forward',
        color: 'orange',
      },
      {
        label: 'done',
        value: Status.done,
        icon: 'done',
        color: 'positive',
      },
    ],
  }),

  getters: {},

  actions: {
    setTodo(e: Array<Todo>) {
      this.todo = e;
    }
  }
});
