<script lang="ts">
    import type {Readable} from 'svelte/store';
    import { derived } from "svelte/store";
    import type { FigureView } from "../lib/entities";
    import { Next } from "../store/next";
    import { figureWidth, figureCellIsSolid } from "../lib/figures";
  
    const view: Readable<FigureView> = derived(Next, ($Next) => {
      const emptyLine = Array(figureWidth($Next) + 2).fill(0);
      return [
        emptyLine, 
        ...$Next.map((line) => [0, ...line, 0]), 
        emptyLine];
    });
  </script>
  
  <div>
    <table>
      {#each $view as line}
        <tr>
          {#each line as cell}
            {@const figure = figureCellIsSolid(cell)}
            <td class:figure />
          {/each}
        </tr>
      {/each}
    </table>
  </div>
  
  <style>
    div {
      margin: 0 auto;
    }
    td {
      width: 10px;
      height: 10px;
      background-color: #f5f5f5;
    }
    td.figure {
      background-color: lightgray;
    }
  </style>