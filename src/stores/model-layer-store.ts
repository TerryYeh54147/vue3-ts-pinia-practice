import { defineStore } from 'pinia';
import { InputType, Layer } from '../models/model'
import _ from 'lodash';

export const useModelLayerStore = defineStore('modelLayer', {
  state: () => ({
    modelLayerDefaultInputed: {
      uid: '',
      envSetting: { framework: '', isPretrained: false },
      file: null,
      modelLayer: [],
    },
    modelLayerInputed: {
      uid: '',
      envSetting: { framework: '', isPretrained: false },
      file: null,
      modelLayer: [] as Array<Layer>,
    },
    kerasAPI: {
      Embedding: {
        label: 'Embedding',
        params: [
          { label: 'input_dim', inputType: InputType.text },
          { label: 'output_dim', inputType: InputType.text },
          { label: 'embeddings_initializer', inputType: InputType.select, option: 'initializers' },
          { label: 'embeddings_regularizer', inputType: InputType.text },
          { label: 'embeddings_constraint', inputType: InputType.text },
          { label: 'mask_zero', inputType: InputType.select, option: 'maskZero' },
          { label: 'input_length', inputType: InputType.text, class: 'col-12', hint: 'This argument is required if you are going to connect Flatten then Dense layers upstream' },
        ],
      },
      Dense: {
        label: 'Dense',
        params: [
          { label: 'units', inputType: InputType.text, hint: 'Positive integer' },
          { label: 'activation', inputType: InputType.select, option: 'activation' },
          { label: 'use_bias', inputType: InputType.select, option: 'useBias', hint: 'Positive integer' },
          { label: 'kernel_initializer', inputType: InputType.select, option: 'initializers' },
          { label: 'bias_initializer', inputType: InputType.select, option: 'initializers' },
          { label: 'kernel_regularizer', inputType: InputType.text },
          { label: 'bias_regularizer', inputType: InputType.text },
          { label: 'activity_regularizer', inputType: InputType.text },
          { label: 'kernel_constraint', inputType: InputType.text },
          { label: 'bias_constraint', inputType: InputType.text },
        ]
      },
      Conv2D: {
        label: 'Conv2D',
        params: [
          { label: 'filters', inputType: InputType.text, hint: 'the dimensionality of the output space' },
          { label: 'kernel_size', inputType: InputType.text, hint: 'An integer or tuple/list of 2 integers', placeholder: 'e.g. 2,2' },
          { label: 'strides', inputType: InputType.text, hint: 'An integer or tuple/list of 2 integers', placeholder: 'e.g. 2,2' },
          { label: 'padding', inputType: InputType.select, option: 'padding' },
          { label: 'data_format', inputType: InputType.text },
          { label: 'dilation_rate', inputType: InputType.text, hint: 'an integer or tuple/list of 2 integers', placeholder: 'e.g. 2,2' },
          { label: 'groups', inputType: InputType.text, hint: 'A positive integer specifying the number' },
          { label: 'activation', inputType: InputType.select, option: 'activation' },
          { label: 'use_bias', inputType: InputType.select, option: 'useBias' },
          { label: 'kernel_initializer', inputType: InputType.select, option: 'initializers' },
          { label: 'bias_initializer', inputType: InputType.select, option: 'initializers' },
          { label: 'kernel_regularizer', inputType: InputType.text },
          { label: 'bias_regularizer', inputType: InputType.text },
          { label: 'activity_regularizer', inputType: InputType.text },
          { label: 'kernel_constraint', inputType: InputType.text },
          { label: 'bias_constraint', inputType: InputType.text },
        ]
      },
      MaxPooling2D: {
        label: 'MaxPooling2D',
        params: [
          { label: 'pool_size', inputType: InputType.text, hint: 'integer or tuple of 2 integers', placeholder: 'e.g. 2,2' },
          { label: 'strides', inputType: InputType.text, hint: 'An integer or tuple/list of 2 integers', placeholder: 'e.g. 2,2' },
          { label: 'padding', inputType: InputType.select, option: 'padding' },
          { label: 'data_format', inputType: InputType.text },

        ],
      },
      Flatten: {
        label: 'Flatten',
        params: [
          { label: 'data_format', inputType: InputType.text, class: 'col-12' },
        ]
      }

    },
    kerasAPIOtions: {
      useBias: ['True', 'False'],
      maskZero: ['True', 'False'],
      padding: ['valid', 'same'],
      activation: ['relu', 'sigmoid', 'softmax', 'softplus', 'softsign', 'tanh', 'selu', 'elu', 'exponential'],
      initializers: [
        'initializer',
        'zeros',
        'ones',
        'constant',
        'random_normal',
        'random_uniform',
        'truncated_Normal',
        'variance_scaling',
        'orthogonal',
        'identity',
        'lecun_uniform',
        'glorot_normal',
        'glorot_uniform',
        'he_normal',
        'lecun_normal',
        'he_uniform'
      ]
    }
  }),
  getters: {
  },
  actions: {
    syncLayer(layers: Array<Layer>) {
      this.modelLayerInputed.modelLayer = layers;
      console.log('=== sync layers ===');
      console.log(this.modelLayerInputed);
    },
    syncLayerModelLayerInputed(data) {
      console.log(data);
      this.modelLayerInputed = { ...this.modelLayerInputed, ..._.cloneDeep(data) };
      console.log('=== sync modelLayerInputed ===');
      console.log(this.modelLayerInputed);
    },
  },
});
