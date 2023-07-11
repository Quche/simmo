<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface $$Props extends HTMLInputAttributes {
    label: string;
    name: string;
    value: number;
    step?: number;
  }

  export let label: string;
  export let name: string;
  export let value: number;
  export let step: number = 1;

  const updateValue = (newValue: number) => {
    if (newValue < 0) return;
    value = roundToStep(newValue);
  };

  const roundToStep = (value: number) => {
    return parseFloat((Math.round(value / step) * step).toFixed(2));
  };
</script>

<div class="container">
  <label for={name}>{label}</label>
  <div class="input">
    <button on:click|preventDefault={() => updateValue(value - step)}>-</button>
    <input type="number" bind:value id={name} {name} {step} min="0" {...$$restProps} />
    <button on:click|preventDefault={() => updateValue(value + step)}>+</button>
  </div>
</div>

<style>
  * {
    box-sizing: border-box;
    font-family: 'Courier New', Courier, monospace;
  }

  div.container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  div.input {
    display: flex;
    flex-direction: row;
    justify-content: start;
  }

  label {
    text-align: center;
    padding-bottom: 0.5rem;
  }

  input {
    margin: auto 0.5rem;
    display: block;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    padding: 0.5rem;
    width: 100%;
  }

  button {
    display: block;
    margin: auto 0.5rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    padding: 0.5rem;
    width: 2rem;
    height: 2rem;
    background-color: #ccc;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
  }

  button:hover {
    background-color: #aaa;
  }

  button:active {
    background-color: #888;
  }
</style>
