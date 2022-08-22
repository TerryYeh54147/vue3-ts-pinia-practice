import _ from 'lodash';

export function isEmptyString(str: string): boolean {
  return _.isString(str) && str.length > 0;
}

export function isValidKey(key: string | number | symbol, obj: object): key is keyof typeof obj {
  return key in obj;
}

export function isAvalibleObjVal(key: string, obj: object): boolean {
  let isAvalible = true;
  const stringtifyObj = JSON.stringify(obj);
  const keyAndObj = `key: ${key}, obj: ${stringtifyObj}`;
  if (!isEmptyString(key)) {
    console.warn(`[Invalid key] ${keyAndObj}`);
    isAvalible = false;
  } else if (_.isEmpty(obj)){
    console.warn(`[Invalid object] ${stringtifyObj}`);
    isAvalible = false;
  } else if (obj[key]){
    console.warn(`[Not found object value] ${keyAndObj}`)
    isAvalible = false;
  }
  return isAvalible;
}
