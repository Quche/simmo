<script lang="ts">
  import type { PageData } from './$types';
  import Input from './Input.svelte';
  import Results from './Results.svelte';
  import { deserialize } from '$app/forms';
  import type { ActionResult } from '@sveltejs/kit';

  let form: HTMLFormElement;

  export let data: PageData;

  let amount = Number(data.params.amount) || 100000;
  let duration = Number(data.params.duration) || 20;
  let rate = Number(data.params.rate) || 3;
  let income = Number(data.params.income) || 2000;

  let newResults = null;

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('amount', amount.toString());
    formData.append('duration', duration.toString());
    formData.append('rate', rate.toString());
    formData.append('income', income.toString());

    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
    });
    const result: ActionResult = deserialize(await response.text());
    newResults = result.data.body.results;
  };
</script>

<h1>Simmo turbo 🍟</h1>

<div class="container">
  <form bind:this={form} method="post" on:submit|preventDefault={handleSubmit}>
    <Input
      label={'Montant emprunté'}
      name={'amount'}
      bind:value={amount}
      step={1000}
      on:change={handleSubmit}
    />

    <Input
      label={'Durée du pret en années'}
      name={'duration'}
      bind:value={duration}
      on:change={handleSubmit}
    />

    <Input
      label={'Taux annuel'}
      name={'rate'}
      bind:value={rate}
      step={0.05}
      on:change={handleSubmit}
    />

    <Input
      label={'Revenus mensuels nets'}
      name={'income'}
      bind:value={income}
      step={50}
      on:change={handleSubmit}
    />
  </form>
  <Results initialResults={data.params.initialResults} {newResults} />
</div>

<style>
  * {
    box-sizing: border-box;
    font-family: 'Courier New', Courier, monospace;
  }

  div.container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  h1 {
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 30rem;
    margin: 0 auto;
  }
</style>
