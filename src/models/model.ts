export enum InputType {
  'select',
  'text',
}

export interface Layer {
  id: string,
  label: string,
  class: string,
  params: object,
}

export interface layerParams {
  (key: string): string;
}

// waiting for use
export interface KerasAPILayerParams{
  label: string,
  inputType: InputType,
  options?: Array<string>,
  hint?: string,
  rules?: Array<string>,
}

// export interface KerasAPI{
//   label: string,
//   params: Array<KerasAPILayerParams>,
// }

