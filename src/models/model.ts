import type { Node, Edge } from '@braks/vue-flow'

export enum InputType {
  'select',
  'text',
}

export interface EnvSetup {
  framework: string;
  isPretrained: boolean;
}

export interface ModelLayer extends Node {
  data: Layer;
}

export declare type ModelElement = ModelLayer | Edge;

export interface Layer {
  id: string,
  label: string,
  class: string,
  params: object,
}

export interface modelSelected {
  uid: string,
  envSetting: EnvSetup,
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

