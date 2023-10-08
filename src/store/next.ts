import { writable } from 'svelte/store';
import { randomFigure } from '../lib/figures';

export const Next = writable(randomFigure());
