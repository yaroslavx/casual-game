<script lang="ts">
    import { derived } from "svelte/store";
    import { BoxCellState } from "../lib/entities";
    import { Box } from "../store/box";
    import { Figure } from "../store/figure";
    import { figureCellIsSolid } from "../lib/figures";
    import { deepClone } from "../lib/utils";
  
    const view = derived([Box, Figure], ([$Box, $Figure]) => {
      const { view, location: { row, column } } = $Figure;
      let box = deepClone($Box);
      view.forEach((line, y) =>
        line.forEach((cell, x) => {
          if (figureCellIsSolid(cell)) {
            box[row + y][column + x] = BoxCellState.figure;
          }
        })
      );
      return box;
    });
  </script>
  
  <table>
    {#each $view as line}
      <tr>
        {#each line as cell}
          {@const empty = cell === BoxCellState.empty}
          {@const figure = cell === BoxCellState.figure}
          {@const frozen = cell === BoxCellState.frozen}
          <td class:empty class:figure class:frozen />
        {/each}
      </tr>
    {/each}
  </table>
  
  <style>
    td {
      width: 10px;
      height: 10px;
    }
    td.empty {
      background-color: #f5f5f5;
    }
    td.figure {
      background-color: lightgray;
    }
    td.frozen {
      background-color: gray;
    }
  </style>