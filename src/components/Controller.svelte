<script lang="ts">
    import { createEventDispatcher } from "svelte";
  
    const dispatch = createEventDispatcher();
  
    const Action: { [key: string]: [string[], string] } = {
      left: [["ArrowLeft", "a", "A"], "Left ←, a, A"],
      right: [["ArrowRight", "d", "D"], "Right →, d, D"],
      down: [["ArrowDown", "s", "S"], "Down ↓, s, S"],
      turn: [["ArrowUp", "w", "W"], "Turn ↑, w, W"],
      drop: [[" "], "Drop [Space]"],
      pause: [["Pause", "p", "P"], "Pause [Pause]"],
    };
  
    function label(actionName: string) {
      const [_, hint] = Action[actionName];
      return hint;
    }
  
    function handleKeyDown(event: KeyboardEvent) {
      for (let action in Action) {
        const [codes, _] = Action[action];
        if (codes.includes(event.key)) {
          dispatch(action);
          break;
        }
      }
    }
  </script>
  
  <div>
    {#each Object.keys(Action) as actionName}
      <p>{label(actionName)}</p>
    {/each}
  </div>
  
  <svelte:window on:keydown={handleKeyDown} />
  
  <style>
    p {
      margin: 0px;
      font-size: 0.7rem;
    }
  </style>