export default function ProjectForm() {
  return (
    <section class="text-gray-600 body-font container px-5 py-24 mx-auto width">
      <form method="post" class="space-y-6" action="/project-results">
        <div>
          <label
            for="project-name"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Project name:
          </label>
          <div class="relative mt-2 rounded-md shadow-sm">
            <input
              type="text"
              name="project-name"
              id="project-name"
              required
              class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            for="yearly-loan-rate"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Yearly loan rate:
          </label>
          <div class="relative mt-2 rounded-md shadow-sm">
            <input
              type="number"
              name="yearly-loan-rate"
              id="yearly-loan-rate"
              min="0"
              max="100"
              step="0.01"
              defaultValue="3"
              required
              class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span class="text-gray-500 sm:text-sm">%</span>
            </div>
          </div>
        </div>
        <div>
          <label
            for="loan-duration"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Loan duration in years:
          </label>
          <div class="relative mt-2 rounded-md shadow-sm">
            <input
              type="number"
              name="loan-duration"
              id="loan-duration"
              min="1"
              max="30"
              required
              defaultValue="20"
              class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            for="total-amount"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Total amount to borrow:
          </label>
          <div class="relative mt-2 rounded-md shadow-sm">
            <input
              type="number"
              name="total-amount"
              id="total-amount"
              required
              min="0"
              step="1000"
              defaultValue="100000"
              class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span class="text-gray-500 sm:text-sm">€</span>
            </div>
          </div>
        </div>
        <div>
          <label
            for="net-monthly-income"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Net monthly income:
          </label>
          <div class="relative mt-2 rounded-md shadow-sm">
            <input
              type="number"
              name="net-monthly-income"
              id="net-monthly-income"
              required
              min="0"
              step="50"
              defaultValue="2000"
              class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span class="text-gray-500 sm:text-sm">€</span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="flex w-auto m-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
