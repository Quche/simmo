<script lang="ts">
  type Results = {
    debtLoanRatio: number;
    monthlyLoanCost: number;
    totalLoanCost: number;
  };
  export let initialResults: Results;
  export let newResults: Results | null = null;

  let deltas: Results;

  $: if (newResults) {
    deltas = {
      debtLoanRatio: newResults.debtLoanRatio - initialResults.debtLoanRatio,
      monthlyLoanCost: newResults.monthlyLoanCost - initialResults.monthlyLoanCost,
      totalLoanCost: newResults.totalLoanCost - initialResults.totalLoanCost,
    };
  }

  const formatDelta = (delta: number) => {
    if (delta > 0) {
      return `(+${delta.toFixed(2)})`;
    }
    return `(${delta.toFixed(2)})`;
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
        <span class="value">{newResults.monthlyLoanCost} €</span>
        <span class={deltaCssClasses(deltas.monthlyLoanCost)}
          >{formatDelta(deltas.monthlyLoanCost)}</span
        >
      {:else}
        <span class="value">{initialResults.monthlyLoanCost} €</span>
      {/if}
    </p>
  </div>
  <div>
    <h2>Taux d'endettement</h2>
    <p>
      {#if newResults && deltas.debtLoanRatio !== 0}
        <span class="value">{newResults.debtLoanRatio} %</span>
        <span class={deltaCssClasses(deltas.debtLoanRatio)}
          >{formatDelta(deltas.debtLoanRatio)}</span
        >
      {:else}
        <span class="value">{initialResults.debtLoanRatio} %</span>
      {/if}
    </p>
  </div>
  <div>
    <h2>Total des intérets</h2>
    <p>
      {#if newResults && deltas.totalLoanCost !== 0}
        <span class="value">{newResults.totalLoanCost.toFixed(0)} €</span>
        <span class={deltaCssClasses(deltas.totalLoanCost)}
          >{formatDelta(deltas.totalLoanCost)}</span
        >
      {:else}
        <span class="value">{initialResults.totalLoanCost.toFixed(0)} €</span>
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
    flex-wrap: wrap;
    justify-content: space-around;
    max-width: 900px;
    margin: 0 auto;
  }

  .results > div {
    padding: 2rem;
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
