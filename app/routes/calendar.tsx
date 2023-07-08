import { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Sidebar } from "~/components/sidebar";
import { authenticator } from "~/services/auth.server";

export const meta: V2_MetaFunction = () => [{ title: "osinica - calendar" }];

export const loader: LoaderFunction = ({ request }) => {
  return authenticator.authenticate("github", request, {
    failureRedirect: "/",
  });
};

export default function CalendarIndex() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
