import { get } from 'svelte/store';
import {
  MaxHeartbeat,
  MinHeartbeat,
  MinLevel,
  MaxLevel,
  BoxWidth,
  BoxHeight,
  CompletedLinesToAdvanceLevel,
} from './lib/settings';
import type { FigureView } from './lib/entities';
import { BoxCellState } from './lib/entities';
import {
  figureWidth,
  figureHeight,
  figureCellIsSolid,
  randomFigure,
} from './lib/figures';
import { Box, clean as cleanBox } from './store/box';
import { Figure } from './store/figure';
import { Next } from './store/next';
import { Stats, reset as resetStats } from './store/stats';
import { turn90 } from './lib/linalg';
import { initialColumn } from './lib/utils';

let timer;
let heartbeat = MaxHeartbeat;

function gameOver() {
  stop();
  if (confirm('The game is over')) {
    cleanBox();
    resetStats();
    heartbeat = MaxHeartbeat;
    run();
  }
}

function figureAtTheBottom() {
  const box = get(Box);
  const {
    view,
    location: { row, column },
  } = get(Figure);
  const figureBottom = row + figureHeight(view);
  if (figureBottom === BoxHeight) {
    return true;
  }
  return view.some((line, j) =>
    line.some((cell, i) => {
      return (
        figureCellIsSolid(cell) &&
        box[row + j + 1][column + i] === BoxCellState.frozen
      );
    })
  );
}

function freeze() {
  const box = get(Box);
  const {
    view,
    location: { row, column },
  } = get(Figure);
  view.forEach((line, j) =>
    line.forEach((cell, i) => {
      if (figureCellIsSolid(cell)) {
        box[row + j][column + i] = BoxCellState.frozen;
      }
    })
  );
}

function increaseSpeed() {
  const oldHeartbeat = heartbeat;
  const levels = MaxLevel - MinLevel;
  const heartbeats = MaxHeartbeat - MinHeartbeat;
  const deltaHeartbeat = heartbeats / levels;
  const newHeartbeat = Math.floor(heartbeat - deltaHeartbeat);
  heartbeat = Math.max(MinHeartbeat, newHeartbeat);
  if (heartbeat > oldHeartbeat) {
    stop();
    run();
  }
}

function eraseCompletedLines() {
  const box = get(Box);

  const completedLines = [];
  box.forEach((line, j) => {
    if (line.every((cell) => cell === BoxCellState.frozen))
      completedLines.push(j);
  });

  completedLines.forEach((completedLine) => {
    for (let j = completedLine; j > 0; j--) {
      box[j] = [...box[j - 1]];
    }
  });

  const { level, lines } = get(Stats);
  const totalCompletedLines = lines + completedLines.length;
  const nextLevel = Math.min(
    MaxLevel,
    Math.floor(totalCompletedLines / CompletedLinesToAdvanceLevel)
  );

  Stats.set({
    lines: totalCompletedLines,
    level: nextLevel,
  });

  if (nextLevel > level) {
    increaseSpeed();
  }
}

function figureCrashesIntoFrozenLines(
  row: number,
  column: number,
  view: FigureView
) {
  return view.some((line, j) =>
    line.some(
      (cell, i) =>
        figureCellIsSolid(cell) &&
        get(Box)[row + j][column + i] === BoxCellState.frozen
    )
  );
}

function enabledPlacement(row: number, column: number, view: FigureView) {
  const figureInsideBox =
    row >= 0 &&
    row + figureHeight(view) <= BoxHeight &&
    column >= 0 &&
    column + figureWidth(view) <= BoxWidth;

  return figureInsideBox && !figureCrashesIntoFrozenLines(row, column, view);
}

function impossibleMovement(dRow: number, dColumn: number) {
  const {
    view,
    location: { row, column },
  } = get(Figure);
  return !enabledPlacement(row + dRow, column + dColumn, view);
}

function move(dRow: number, dColumn: number) {
  if (gameIsPaused()) return;
  if (impossibleMovement(dRow, dColumn)) return;
  let {
    view,
    location: { row, column },
  } = get(Figure);
  row += dRow;
  column += dColumn;
  Figure.set({ view, location: { row, column } });
}

function run() {
  timer = setInterval(() => {
    if (figureAtTheBottom()) {
      freeze();
      eraseCompletedLines();
      const next = get(Next);
      const row = 0;
      const column = initialColumn(next);
      if (figureCrashesIntoFrozenLines(row, column, next)) {
        gameOver();
      } else {
        Figure.set({ view: next, location: { row, column } });
        Next.set(randomFigure());
      }
    } else moveDown();
  }, heartbeat);
}
function stop() {
  clearInterval(timer);
  timer = undefined;
}

function moveLeft() {
  move(0, -1);
}
function moveRight() {
  move(0, 1);
}
function moveDown() {
  move(1, 0);
}
function drop() {
  while (!figureAtTheBottom()) {
    moveDown();
  }
}
function turn() {
  if (gameIsPaused()) return;
  const {
    view,
    location: { row, column },
  } = get(Figure);
  const turned = turn90(view);
  if (enabledPlacement(row, column, turned)) {
    Figure.set({ view: turned, location: { row, column } });
  }
}

function gameIsPaused() {
  return timer === undefined;
}

function pause() {
  if (gameIsPaused()) {
    run();
  } else {
    stop();
  }
}

export const Tetris = {
  pause,
  moveLeft,
  moveRight,
  moveDown,
  drop,
  turn,
};
