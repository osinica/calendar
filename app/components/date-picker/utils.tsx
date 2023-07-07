import { DateTime } from "luxon";

export const sameDay = (dt1: DateTime, dt2: DateTime): boolean =>
  dt1.toISODate() === dt2.toISODate();

export const sameMonth = (dt1: DateTime, dt2: DateTime): boolean =>
  dt1.toFormat("yyyy-MM") === dt2.toFormat("yyyy-MM");
