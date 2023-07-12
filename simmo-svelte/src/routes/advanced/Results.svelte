<script lang="ts">
  import type { LoanResults } from './types';

  export let initialResults: LoanResults;
  export let newResults: LoanResults | null = null;

  let deltas: LoanResults;

  $: if (newResults) {
    deltas = {
      debtLoanRatio: newResults.debtLoanRatio - initialResults.debtLoanRatio,
      monthlyLoanCost: newResults.monthlyLoanCost - initialResults.monthlyLoanCost,
      totalLoanCost: newResults.totalLoanCost - initialResults.totalLoanCost,
    };
  }

  const formatMonthlyLoacCoast = (cost: number, sign = false) => {
    return cost.toLocaleString('fr-FR', {
      maximumFractionDigits: 0,
      signDisplay: sign ? 'always' : 'auto',
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'symbol',
    });
  };

  const formatDebtRatio = (ratio: number, sign = false) => {
    return (ratio / 100).toLocaleString('fr-FR', {
      maximumFractionDigits: 2,
      signDisplay: sign ? 'always' : 'auto',
      style: 'percent',
    });
  };

  const formatLoanCost = (cost: number, sign = false) => {
    return cost.toLocaleString('fr-FR', {
      maximumFractionDigits: 0,
      signDisplay: sign ? 'always' : 'auto',
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'symbol',
    });
  };

  const deltaCssClasses = (delta: number) => {
    if (delta > 0) {
      return 'delta red';
    }
    return 'delta green';
  };
</script>

<div class="results">
  <div>
    <h2>Mensualités</h2>
    <p>
      {#if newResults && deltas.monthlyLoanCost !== 0}
        <span class="value">{formatMonthlyLoacCoast(newResults.monthlyLoanCost)}</span>
        <span class={deltaCssClasses(deltas.monthlyLoanCost)}
          >{`(${formatMonthlyLoacCoast(deltas.monthlyLoanCost, true)})`}</span
        >
      {:else}
        <span class="value">{formatMonthlyLoacCoast(initialResults.monthlyLoanCost)}</span>
      {/if}
    </p>
  </div>
  <div>
    <h2>Taux d'endettement</h2>
    <p>
      {#if newResults && deltas.debtLoanRatio !== 0}
        <span class="value">{formatDebtRatio(newResults.debtLoanRatio)}</span>
        <span class={deltaCssClasses(deltas.debtLoanRatio)}
          >{`(${formatDebtRatio(deltas.debtLoanRatio, true)})`}</span
        >
      {:else}
        <span class="value">{formatDebtRatio(initialResults.debtLoanRatio)}</span>
      {/if}
    </p>
  </div>
  <div>
    <h2>Total des intérets</h2>
    <p>
      {#if newResults && deltas.totalLoanCost !== 0}
        <span class="value">{formatLoanCost(newResults.totalLoanCost)}</span>
        <span class={deltaCssClasses(deltas.totalLoanCost)}
          >{`(${formatLoanCost(deltas.totalLoanCost, true)})`}</span
        >
      {:else}
        <span class="value">{formatLoanCost(initialResults.totalLoanCost)}</span>
      {/if}
    </p>
  </div>
</div>

<style>
  * {
    box-sizing: border-box;
    font-family: 'Courier New', Courier, monospace;
  }

  div.results {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  div.results > div > p {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
  }

  span.value {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
  }

  span.delta {
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    margin-left: 0.5rem;
  }

  span.red {
    color: red;
  }

  span.green {
    color: green;
  }

  h2 {
    text-align: center;
  }
</style>
