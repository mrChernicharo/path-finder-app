import { Node, Pos } from '../redux/modules/world-map/world-map';

const ID_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';

export const idMaker = (length = 12) =>
  Array(length)
    .fill(0)
    .map((item) => ID_CHARS.split('')[Math.round(Math.random() * ID_CHARS.length)])
    .join('');

export const klasss = (...args: string[]) => args.filter(Boolean).join(' ');
