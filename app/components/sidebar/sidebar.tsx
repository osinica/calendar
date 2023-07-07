import { FunctionComponent } from "react";
import { SidebarContainer } from "./container";
import { SidebarLogo } from "./logo";
import { Button } from "../button";
import { DatePicker } from "../date-picker";
import { Link } from "@remix-run/react";

export const Sidebar: FunctionComponent = () => {
  return (
    <SidebarContainer>
      <SidebarLogo />
      <div className="flex flex-col gap-2 p-4 h-max border-b border-b-white">
        <Button active>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <p className="font-ibm-plex">new event</p>
        </Button>
        <Link to="integrations">
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
              />
            </svg>
            <p className="font-ibm-plex ">integrations</p>
          </Button>
        </Link>
      </div>
      <div className="p-4 b-0">
        <DatePicker />
      </div>
    </SidebarContainer>
  );
};
