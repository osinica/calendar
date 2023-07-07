import { V2_MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Sidebar } from "~/components/sidebar";

export const meta: V2_MetaFunction = () => [{ title: "osinica - calendar" }];

export default function CalendarIndex() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
