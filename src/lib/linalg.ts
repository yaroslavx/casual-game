import type { Matrix } from './entities';

// транспонирование: столбцы становятся строками, а строки - столбцами
function transpose<T>(m: Matrix<T>) {
  let transposed: Matrix<T> = [];
  m[0].forEach((_, j) => {
    transposed.push([]);
    m.forEach((_, i) => {
      transposed[j].push(m[i][j]);
    });
  });
  return transposed;
}

// поворот на 90 градусов <--> reverseColumns(transpose(view))
export function turn90<T>(m: Matrix<T>): Matrix<T> {
  return transpose(m).map((line) => line.reverse());
}
