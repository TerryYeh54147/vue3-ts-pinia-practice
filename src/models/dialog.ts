import { Todo } from './todo'
export enum DialogMode {
  add,
  edit,
  others,
}

interface Dialog {
  key: number;
  isOpen: boolean;
}

export interface InputDialogProps extends Dialog {
  isOpen: boolean;
  mode: DialogMode;
  input: Todo;
}

export interface ConfirmDialogProps extends Dialog {
  title: string;
  content: string;
}
