import { FunctionComponent, JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

type ButtonProps = JSX.HTMLAttributes<HTMLButtonElement>;

export const Button: FunctionComponent<ButtonProps> = (props) => {
  const { disabled } = props;
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || disabled}
      class="px-2 py-1 border(gray-100 2) hover:bg-gray-200"
    />
  );
};
