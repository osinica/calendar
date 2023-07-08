import { LoaderArgs, redirect } from "@remix-run/node";
import { useRouteError } from "@remix-run/react";
import { DateTime } from "luxon";
import { useEffect } from "react";
import { json, useLoaderData } from "superjson-remix";
import { useDateContext } from "~/components/context/date-context";
import { DragLayer } from "~/components/dnd/drag-layer";
import { Bar } from "~/components/weekview/bar";
import { DateCols } from "~/components/weekview/date-cols";
import { WeekViewHeader } from "~/components/weekview/header";
import { HourCol } from "~/components/weekview/hour-col";
import { calculateStart } from "~/components/weekview/utils";
import { prisma } from "~/helper/prisma.server";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request);
  if (!user) throw Error("user not found");

  const { events } = await prisma.user.findUniqueOrThrow({
    where: { id: user.id },
    select: { events: true },
  });

  return json({ user, events });
}

export default function Calendar() {
  const { setEvents } = useDateContext();
  const data = useLoaderData();

  useEffect(() => setEvents(data.events), []);

  return (
    <div className="h-full overflow-x-hidden dark:bg-gray-700 relative flex flex-col w-[calc(100%-300px)]">
      <WeekViewHeader>
        <div className="flex-1">
          <Bar />
          <DragLayer />
          <div>
            <div
              className="grid w-full h-full"
              style={{ gridTemplateColumns: "100px repeat(7, 1fr)" }}
            >
              <HourCol />
              <DateCols />
            </div>
          </div>
        </div>
      </WeekViewHeader>
    </div>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();
  return <div>wiked man: {error.toString()}</div>;
};
