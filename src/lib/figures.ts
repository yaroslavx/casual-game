import type { FigureView } from './entities';

interface IFigures {
  [key: string]: FigureView;
}

export const Figures: IFigures = {
  i: [[1, 1, 1, 1]],
  j: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  l: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  o: [
    [1, 1],
    [1, 1],
  ],
  s: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  t: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
};

export function figureCellIsSolid(cell: number) {
  return cell === 1;
}

export function figureCellIsEmpty(cell: number) {
  return !figureCellIsSolid(cell);
}

export function figureWidth(figure: FigureView): number {
  return figure[0].length;
}

export function figureHeight(figure: FigureView): number {
  return figure.length;
}

export function randomFigure(): FigureView {
  const names = Object.keys(Figures);
  const randomIndex = Math.round(Math.random() * (names.length - 1));
  const randomName = names[randomIndex];
  return Figures[randomName];
}
