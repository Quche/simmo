import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";
import RateForm from "../islands/project-form.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <p class="my-6">
          Welcome to `fresh`. Try updating this message in the
          ./routes/index.tsx file, and refresh.
        </p>
        <Counter start={3} />
        <RateForm />
      </div>
    </>
  );
}