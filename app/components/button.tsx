import { FunctionComponent, PropsWithChildren } from "react";

export type ButtonProps = {
  onClick?: () => void;
  active?: boolean;
  type?: "button" | "submit" | "reset";
};

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
  onClick,
  type,
  active,
  children,
}) => {
  return (
    <button
      onClick={() => onClick && onClick()}
      type={type}
      className={`flex items-center w-full rounded px-4 py-2 active:bg-slate-300 text-white transition ease-in-out delay-75 hover:dark:bg-slate-400 hover:dark:text-black ${
        active ? "border border-white" : ""
      }`}
    >
      {children}
    </button>
  );
};
