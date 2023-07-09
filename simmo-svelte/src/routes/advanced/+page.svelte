<script lang="ts">
  import type { PageData } from './$types';
  import Input from './Input.svelte';

  export let data: PageData;

  let amount = Number(data.params.amount) || 100000;
  let duration = Number(data.params.duration) || 20;
  let rate = Number(data.params.rate) || 3;
  let income = Number(data.params.income) || 2000;
</script>

<h1>Simmo turbo 🍟</h1>

<div>
  <h2>Valeurs initiales</h2>
  <div>
    <p><b>Taux d'endettement: </b>{data.params.initialResults.debtLoanRatio} %</p>
    <p><b>Mensualités: </b>{data.params.initialResults.monthlyLoanCost.toFixed(0)} €</p>
    <p><b>Cout du crédit: </b>{data.params.initialResults.totalLoanCost.toFixed(0)} €</p>
  </div>

  <form method="post">
    <label>
      <span>Montant emprunté</span>
      <Input bind:value={amount} step={1000} />
    </label>

    <label>
      Durée du pret en années
      <Input bind:value={duration} />
    </label>

    <label>
      Taux annuel
      <Input bind:value={rate} step={0.05} />
    </label>

    <label>
      Revenus mensuels nets avant impots
      <Input bind:value={income} step={50} />
    </label>
  </form>
</div>

<style>
  h1 {
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  input[type='range'] {
  }
</style>
