export enum InputType {
  'select',
  'text',
}

export interface EnvSetting {
  framework: string;
  isPretrained: boolean;
}

export interface Layer {
  id: string,
  label: string,
  class: string,
  params: object,
}

export interface modelSelected {
  uid: string,
  envSetting: EnvSetting,
  file: null, //TODO: check does it work
  modelLayer: Array<Layer>
}

export interface layerParams {
  (key: string): string;
}

// waiting for use
export interface KerasAPILayerParams {
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

