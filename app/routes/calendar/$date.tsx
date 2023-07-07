import { LoaderArgs } from "@remix-run/node";
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

export async function loader({ request }: LoaderArgs) {
  // const res = await fetch(
  //   "https://graph.microsoft.com/v1.0/me/events?$select=subject,start,end",
  //   {
  //     headers: {
  //       Authorization:
  //         "EwB4A8l6BAAUAOyDv0l6PcCVu89kmzvqZmkWABkAAYwEPc8th5okEoA4fU5/eX3U0dTyibxJguS50MkrdFoGPsZF1uEY4wpq37sBJbzB7DzxTEsNm0v66lItYTTccwAHpg6iWxlJb2vjhOLrsZQKpXL6BRB79dWxqIIcsKMqdh8fXDr9RefhfuSYN1RgdanGcxxCPYbwqqfSEpsd5PxElYDekHlglD9V/wi9frVXaRq71KLMeDX8iboycVje+GsLGg1yNOkHq7hpHEcBJ4+FuIoOJIWRqY7RokHQIfH9BL9hAQHEgjirSFUskhdOjVD0ZAeKM1E2mzqSCOgMtBmC9dN54i/xatbBK9LR5p+CjCAESIMVr1jvuq5zdfSGD84DZgAACELAW+vHDo4gSAL2jjfGXUhkjhC+z5YB06SVd8pQOeRoaykktmvovxGUSIz7kLEJYE/qgSYoAKFR28sGNyK7vLA1l3ttv+f/QXHxFXR+DcWxpf5urFd9T3nyYRNtCaH9Y4RQdLmzoqiVKF6EIOIbqbC9bYhjyo9kpnNGFh11GtohreIA1jsDWkI9C/RK2o8nwRepA4S278EeDySb/Xvc9b4/nuuEKlERvkoLaPAc/7Jp40wk/9UCo/qVNGlsVYUxIEJzw7N/kGpHSu835E68q9Y8uWEGh+wyvuDoO/ZbgaOcfqsamHARrDp2n7Rg7g4bGBC7co54yXvL1yPxEKL/USFUq/WA0tltXF6oF+jq+wkfq9Ds+Kquk1t0Z4Dy5L4FY5e/NcujZJLmwKI+TiGCqqy2hzuqvZOepaybqKkq9BVV2MkExUv3oRI3fZyBE6dG9TpzU8bfQMIS2ZL1O1TN8ukRyUXepIYc38RnL3NnUxS9uQOOsJfQ0ONlaVQg9y5ZdQp8qfZsZ5Rxyi321dFasxBa5a0wMpXZbvvB+97ILsOzFOC4QuQFfiSMn+J+38kEKhmMK4my+MFqdAarYekpqOBFgBkU1TnshOqPpeU+RXSHJhfV8B4c4a3+bynngf1HHIulznFt9gWrgwsRlWL2OPtQFCnlVVx7cBYoJXSxyPwUKah2Vs6AonG/bH6Rw17LGjJjMf9EEfWzx8F8yMc8bFHdW5+a3rg/XSET7MgR7GhUkCaKgsey0AJhxNP92WJu0rpLn37Q/ma5nT5EHJPSiIP7yIIC",
  //     },
  //   }
  // );
  //
  // const json = await res.json();
  //
  // return json.value.map((x: any) => ({
  //   start: DateTime.fromISO(x.start.dateTime),
  //   end: DateTime.fromISO(x.end.dateTime),
  //   subject: x.subject,
  // }));
  return json([]);
}

export default function Calendar() {
  const { setEvents } = useDateContext();
  const data = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  useEffect(
    () =>
      setEvents([
        {
          id: 1,
          start: DateTime.fromObject({ hour: 12 }),
          end: DateTime.fromObject({ hour: 13, minute: 30 }),
          subject: "test event",
        },
        {
          id: 2,
          start: DateTime.fromObject({ hour: 11 }),
          end: DateTime.fromObject({ hour: 11, minute: 15 }),
          subject: "short",
        },
      ]),
    []
  );

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
