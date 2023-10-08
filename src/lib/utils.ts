import type { FigureView } from './entities';
import { figureWidth } from './figures';
import { BoxWidth } from './settings';

export function initialColumn(figure: FigureView) {
  return Math.floor((BoxWidth - figureWidth(figure)) / 2);
}

export function deepClone<T>(any: T) {
  return <T>JSON.parse(JSON.stringify(any));
}
