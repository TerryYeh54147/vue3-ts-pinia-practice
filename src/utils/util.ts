import _ from 'lodash'

export function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
  return key in object;
}

export const getRandomColor = () => {
  return `#${_.floor(_.random(0x000000, 0xffffff)).toString(16)}`;
};

