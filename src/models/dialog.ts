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
  // TODO: define what input type you want
  input?: unknown;
}

export interface ConfirmDialogProps extends Dialog {
  title: string;
  content: string;
}
