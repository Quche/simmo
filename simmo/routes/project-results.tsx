import { Handlers, PageProps } from "$fresh/server.ts";
import {
  computeProjectResults,
  ProjectResults,
  ProjectSettings,
} from "../core/project.ts";

interface ProjectForm extends ProjectSettings {
  projectName: string;
}

interface ProjectResultsProps {
  projectForm: ProjectForm;
  projectResults: ProjectResults;
}

export const handler: Handlers = {
  async POST(req, ctx) {
    console.log("POST /project-results");
    const form = await req.formData();
    console.log(form);
    const projectSettings: ProjectSettings = {
      yearlyLoanRate: Number(form.get("yearly-loan-rate")) || 3,
      loanDuration: Number(form.get("total-duration")) || 30,
      totalAmount: Number(form.get("total-amount")) || 100000,
      netMonthlyIncome: Number(form.get("net-monthly-income")) || 0,
    };
    const projectForm: ProjectForm = {
      ...projectSettings,
      projectName: String(form.get("project-name")) || "",
    };
    const projectResults = computeProjectResults(projectSettings);

    return await ctx.render({
      projectForm,
      projectResults,
    });
  },
};

export default function ProjectResults(
  { data }: PageProps<ProjectResultsProps>,
) {
  const { projectForm, projectResults } = data;
  return (
    <section class="text-gray-600 body-font container px-5 py-24 mx-auto width">
      <div class="flex flex-col text-center w-full mb-12">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          {projectForm.projectName}
        </h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
          Borrowing {projectForm.totalAmount.toLocaleString("fr-FR")}€ over{" "}
          {projectForm.loanDuration} years at {projectForm.yearlyLoanRate}%.
        </p>
      </div>

      <div class="flex flex-wrap justify-center">
        <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 m-4 rounded-lg overflow-hidden text-center relative">
          <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            MONTHLY PAYMENT
          </h2>
          <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
            {projectResults.monthlyLoanCost.toLocaleString("fr-FR")}€
          </h1>
        </div>
        <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 m-4 rounded-lg overflow-hidden text-center relative">
          <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            MONTHLY DEBT RATIO
          </h2>
          <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
            {projectResults.debtLoanRatio.toLocaleString("fr-FR")} %
          </h1>
        </div>
      </div>
    </section>
  );
}
