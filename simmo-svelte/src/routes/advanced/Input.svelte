<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface $$Props extends HTMLInputAttributes {
    label: string;
    name: string;
    inputValue: number;
    step?: number;
  }

  export let label: string;
  export let name: string;
  export let inputValue: number;
  export let step: number = 1;

  const dispatch = createEventDispatcher();

  const updateValue = (newValue: number) => {
    if (newValue < 0) return;
    inputValue = roundToStep(newValue);
    dispatch('change', inputValue);
  };

  const roundToStep = (value: number) => {
    return parseFloat((Math.round(value / step) * step).toFixed(2));
  };
</script>

<div class="container">
  <label for={name}>{label}</label>
  <div class="input">
    <button on:click|preventDefault={() => updateValue(inputValue - step)}>-</button>
    <input
      type="number"
      bind:value={inputValue}
      id={name}
      {step}
      min="0"
      {...$$restProps}
      on:change={() => dispatch('change')}
      on:input={() => dispatch('change')}
    />
    <button on:click|preventDefault={() => updateValue(inputValue + step)}>+</button>
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
