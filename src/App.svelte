<script lang="ts">
      import { Tetris } from "./game";
  import Game from "./components/Game.svelte";
  import Next from "./components/Next.svelte";
  import Stats from "./components/Stats.svelte";
  import Controller from "./components/Controller.svelte";
</script>

<main>
    <div>
        <Game/>
    </div>
    <div class="info">
        <Next/>
        <Controller
        on:left={() => Tetris.moveLeft()}
        on:right={() => Tetris.moveRight()}
        on:down={() => Tetris.moveDown()}
        on:drop={() => Tetris.drop()}
        on:turn={() => Tetris.turn()}
        on:pause={() => Tetris.pause()}
        />
        <Stats/>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: row;
        padding-top: 1rem;
        justify-content: center;
    }

    .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1rem;
    }
</style>