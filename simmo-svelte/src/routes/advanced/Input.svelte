<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let value: number;
  export let step: number = 1;
  export let label: string;
  export let name: string;

  const dispatch = createEventDispatcher();

  $: dispatch('change', { value, name });

  const roundToStep = (value: number) => {
    return parseFloat((Math.round(value / step) * step).toFixed(2));
  };
</script>

<div class="container">
  <label for="input">{label}</label>
  <div class="input">
    <button on:click|preventDefault={() => (value = roundToStep(value - step))}>-</button>
    <input type="number" bind:value id={name} {name} />
    <button on:click|preventDefault={() => (value = roundToStep(value + step))}>+</button>
  </div>
</div>

<style>
  div.container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  div.input {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 1rem;
  }

  label {
    font-size: 1.3rem;
    text-align: center;
  }

  input {
    margin: auto 0.5rem;
    width: 50%;
  }
</style>
