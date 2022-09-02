import { defineStore } from 'pinia';
import { Status, TodoList } from 'src/models/todo';
import { reactive } from 'vue';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todoList: reactive<TodoList>({
      // temp for test
      'not yet': [{
        id: '1',
        content: 'todo 1',
        status: Status['not yet'],
      }],
      'doing': [{
        id: '2',
        content: 'todo 2',
        status: Status.doing,
      }],
      'done': [{
        id: '3',
        content: 'todo 3',
        status: Status.done,
      }],
    }),
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
    setTodo(e: TodoList) {
      this.todoList = e;
    }
  }
});
