import { SerializeFrom } from "@remix-run/node";
import { Event } from "../components/calendar/types";
import { DateTime } from "luxon";

export const hydrateEvents = (data: Serialize<Event>[]) => {
  return data.map((d) => ({
    ...d,
    start: DateTime.fromISO(d.start!),
    end: DateTime.fromISO(d.end!),
  }));
};
