import { ActionFunction, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export async function loader() {
  return redirect("/");
}

export const action: ActionFunction = ({ request }) => {
  return authenticator.authenticate("github", request);
};
