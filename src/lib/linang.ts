import type { Matrix } from './entities';

function transpose<T>(m: Matrix<T>) {
  let transposed: Matrix<T> = [];
  m[0].forEach((_, j) => {
    transposed.push([]);
    m.forEach((_, j) => {
      transposed[j].push(m[i][j]);
    });
  });
  return transposed;
}

export function turn90<T>(m: Matrix<T>): Matrix<T> {
  return transpose(m).map((line) => line.reverse());
}
