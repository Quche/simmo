<script lang="ts">
  export let value: number;
  export let step: number = 1;

  const roundToStep = (value: number) => {
    return Math.round(value / step) * step;
  };
</script>

<div>
  <button on:click|preventDefault={() => (value = roundToStep(value - step))}>-</button>
  <input type="number" bind:value />
  <button on:click|preventDefault={() => (value = roundToStep(value + step))}>+</button>
</div>
