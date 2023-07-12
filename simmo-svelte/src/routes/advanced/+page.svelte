<script lang="ts">
  import type { PageData } from './$types';

  import Input from './Input.svelte';
  import Results from './Results.svelte';
  import type { LoanResults } from './types';

  export let data;

  let { amount, duration, rate, income } = extractLoanSettings(data);
  let newResults: LoanResults | null = null;

  async function postSettings() {
    const response = await fetch('/api/loan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, duration, rate, income }),
    });

    const data = await response.json();

    newResults = data.results;
  }

  function extractLoanSettings(data: PageData) {
    let amount = Number(data.params.amount) || 100000;
    let duration = Number(data.params.duration) || 20;
    let rate = Number(data.params.rate) || 3;
    let income = Number(data.params.income) || 2000;
    return { amount, duration, rate, income };
  }
</script>

<h1>Simmo <b>turbo</b> 🍟</h1>

<div class="container">
  <div class="settings">
    <Input
      label={'Montant emprunté'}
      name={'amount'}
      bind:inputValue={amount}
      step={1000}
      required
      on:change={postSettings}
    />
    <Input
      label={'Durée du pret en années'}
      name={'duration'}
      bind:inputValue={duration}
      required
      on:change={postSettings}
    />
    <Input
      label={'Taux annuel'}
      name={'rate'}
      bind:inputValue={rate}
      step={0.05}
      required
      on:change={postSettings}
    />
    <Input
      label={'Revenus mensuels nets'}
      name={'income'}
      bind:inputValue={income}
      step={50}
      required
      on:change={postSettings}
    />
  </div>
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

  h1 > b {
    font-style: italic;
  }

  .settings {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 30rem;
    margin: 0 auto;
  }
</style>
