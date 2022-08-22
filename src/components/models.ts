
export enum Status {
  'not yet',
  'doing',
  'done',
}

export enum DialogMode {
  add,
  edit,
  others,
}

interface Dialog{
  key: number;
  isOpen: boolean;
}

export interface InputDialogProps extends Dialog{
  isOpen: boolean;
  mode: DialogMode;
}

export interface ConfirmDialogProps extends Dialog{
  title: string;
  content: string;
}

export interface Todo {
  id: number | string;
  content: string;
  status: Status;
}

export interface Meta {
  totalCount: number;
}
