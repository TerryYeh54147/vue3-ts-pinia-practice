export enum Status {
  'not yet',
  'doing',
  'done',
}

export interface Todo {
  id: string;
  content: string;
  status: Status;
  originStatusTag?: number;
}

export interface TodoList {
  [tag: string]: Array<Todo>;
}
