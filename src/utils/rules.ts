import _ from 'lodash';

export function isRequired(val: string): string | boolean {
  return _.isString(val) && val.length > 0 ? true : 'Required';
}
