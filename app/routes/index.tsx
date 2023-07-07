import {
  redirect,
  type LoaderFunction,
  type V2_MetaFunction,
} from "@remix-run/node";
import { DateTime } from "luxon";
import { useDateContext } from "~/components/context/date-context";
import { Sidebar } from "~/components/sidebar";
import { WeekView } from "~/components/weekview";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "osinica - Calendar" },
    { name: "description", content: "Connected calendar for osinica" },
  ];
};

// TODO: change to landing page
export const loader: LoaderFunction = () =>
  redirect(`/calendar/${DateTime.now().toISODate()}`);
