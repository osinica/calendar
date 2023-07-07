import { FunctionComponent, PropsWithChildren } from "react";

export const SidebarContainer: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="h-full w-[300px] border-r dark:border-gray-200 bg-gray-200 dark:bg-gray-800">
      {children}
    </div>
  );
};
