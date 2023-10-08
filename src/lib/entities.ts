export enum BoxCellState {
  empty,
  figure,
  frozen,
}

type Vector<T> = Array<T>;

export type Matrix<T> = Array<Vector<T>>;

export type FigureView = Matrix<number>;

export type GameView = Matrix<BoxCellState>;
