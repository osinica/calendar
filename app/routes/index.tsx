import {
  redirect,
  type LoaderFunction,
  type V2_MetaFunction,
  LoaderArgs,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/button";
import { authenticator } from "~/services/auth.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "osinica - Calendar" },
    { name: "description", content: "Connected calendar for osinica" },
  ];
};

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request);

  return { isAuthenticated: !!user };
}

export default function Index() {
  const data = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  return (
    <div className="w-full h-full flex items-center justify-center dark:bg-slate-600 flex-col dark:text-white gap-4">
      <h2>osinica</h2>
      <h1 className="text-4xl font-ibm-plex">calendar</h1>
      {data.isAuthenticated ? (
        <Link to="calendar">
          <Button active type="submit">
            get started
          </Button>
        </Link>
      ) : (
        <Form action="/auth/github" method="post">
          <Button active type="submit">
            login
          </Button>
        </Form>
      )}
    </div>
  );
}
