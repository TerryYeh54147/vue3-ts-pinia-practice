import _ from 'lodash'
export const getRandomColor = () => {
  return `#${_.floor(_.random(0x000000, 0xffffff)).toString(16)}`;
};
