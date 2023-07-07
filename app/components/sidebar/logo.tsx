import { Link } from "@remix-run/react";
import { FunctionComponent } from "react";

export const SidebarLogo: FunctionComponent = () => {
  return (
    <Link to="/calendar">
      <div className="flex items-center p-4 border-b border-gray-300">
        <img
          src="https://raw.githubusercontent.com/flexwie/stepdad/main/assets/Logo_Stepdad.png"
          className="w-16 h-16 mr-4"
        />
        <span className="font-ibm-plex text-xl dark:text-white">calendar</span>
      </div>
    </Link>
  );
};
