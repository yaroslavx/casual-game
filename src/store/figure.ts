import { writable } from 'svelte/store';
import { randomFigure } from '../lib/figures';
import { initialColumn } from '../lib/utils';

const view = randomFigure();

export const Figure = writable({
  view,
  location: {
    row: 0,
    column: initialColumn(view),
  },
});
