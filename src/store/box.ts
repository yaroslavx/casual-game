import type { Writable } from 'svelte/store';
import { writable, get } from 'svelte/store';
import { BoxHeight, BoxWidth } from '../lib/settings';
import { BoxCellState } from '../lib/entities';
import type { GameView } from '../lib/entities';

export const Box: Writable<GameView> = writable(
  Array(BoxHeight)
    .fill([])
    .map((_) => Array(BoxWidth).fill(BoxCellState.empty))
);

export function clean() {
  Box.set(
    get(Box).map((line) => line.map((cell) => (cell = BoxCellState.empty)))
  );
}
