import _ from 'lodash';

export function isRequired(val: string): string | boolean {
  console.log(val);
  console.log(`check is required: ${_.isString(val) && val.length > 0}`);
  return _.isString(val) && val.length > 0 ? true : 'Required';
}
