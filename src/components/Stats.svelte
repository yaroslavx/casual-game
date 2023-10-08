<script>
    import {Stats} from '../store/stats'
</script>

<div class="stats">
    <div class='item'>Level: {$Stats.level}</div>
    <div class='item'>Lines: {$Stats.lines}</div>
</div>

<style>
    .stats {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    .item {
        font-size: 1rem;
    }
</style>