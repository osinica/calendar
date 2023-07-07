import { DateTime, Interval } from "luxon";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { sameDay, sameMonth } from "./utils";
import { useDateContext } from "../context/date-context";

export const DatePicker: FunctionComponent = () => {
  const { currentDate, setCurrentDate } = useDateContext();

  const [viewDate, setViewDate] = useState(currentDate);

  useEffect(() => {setViewDate(currentDate)}, [currentDate])

  const days = useMemo(() => {
    const start = DateTime.fromObject({
      day: 1,
      month: viewDate.get("month"),
      year: viewDate.get("year"),
    });
    const end = start.endOf("month");

    return Interval.fromDateTimes(start, end)
      .splitBy({ day: 1 })
      .map((d) => d.start);
  }, [viewDate]);

  const rows: DateTime[][] = useMemo(() => {
    const offset = new Array(parseInt(days.at(0)!.toFormat("c")) - 1)
      .fill(null)
      .map((_, i) => days.at(0)?.minus({ days: i + 1 }))
      .reverse();
    const tail = new Array(7 - ((days.length + offset.length) % 7))
      .fill(null)
      .map((_, i) => days.at(-1)?.plus({ days: i + 1 }));

    return offset
      .concat(days as any)
      .concat(tail)
      .reduce((all: any[], one: any, i) => {
        const ch = Math.floor(i / 7);
        all[ch] = [].concat(all[ch] || [], one);
        return all;
      }, []);
  }, [days]);

  const handleSelection = (d: DateTime) => setCurrentDate(d);
  const handleMonthForward = () => setViewDate(viewDate.plus({ month: 1 }));
  const handleMonthBackward = () => setViewDate(viewDate.minus({ month: 1 }));

  return (
    <div className="w-full h-fit">
      <div className="flex flex-row justify-between pl-3 pr-2 text-white font-ibm-plex mb-2">
        <span>{currentDate.toFormat("MMMM yy").toLowerCase()}</span>
        <div className="flex flex-row">
          <button onClick={handleMonthBackward}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button onClick={handleMonthForward}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <div role="grid">
        <div className="flex flex-row justify-evenly" role="row">
          {["M", "T", "W", "T", "F", "S", "S"].map((e, i) => (
            <p
              className="w-8 h-8 inline-flex items-center justify-evenly  text-gray-600"
              key={e + i}
            >
              {e}
            </p>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={i} className="flex flex-row justify-evenly" role="row">
            {r.map((d) => (
              <button
                onClick={() => handleSelection(d)}
                key={d.toISODate()}
                className={`w-8 h-8 inline-flex items-center justify-center rounded-md hover:bg-gray-200 hover:text-gray-600 ${
                  sameDay(d, DateTime.now()) ? "text-fuchsia-300" : ""
                } ${!sameMonth(d, viewDate) ? "text-gray-600" : "text-white"} ${
                  sameDay(d, currentDate) ? "bg-fuchsia-300 text-white" : ""
                }`}
              >
                {d.toFormat("d")}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
