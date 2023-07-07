import { LoaderFunction, redirect } from "@remix-run/node";
import { DateTime } from "luxon";

export const loader: LoaderFunction = () => {
  return redirect(`/calendar/${DateTime.now().toISODate()}`);
};
