import { useNavigate } from "@remix-run/react";
import { DateTime, Interval } from "luxon";
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type DateContextType = {
  currentDate: DateTime;
  days: DateTime[];
  events: any[];
  setEvents: (events: any[]) => void;
  setCurrentDate: (date: DateTime, opts?: { navigate?: boolean }) => void;
};

export const DateContext = createContext<DateContextType | null>(null);

export const DateContextProvider: FunctionComponent<
  PropsWithChildren<{ initialDate: DateTime }>
> = ({ children, initialDate }) => {
  const [date, setDate] = useState(initialDate);
  const [events, setEvents] = useState<any[]>([]);

  const navigate = useNavigate();

  const setDateInter = (date: DateTime, opts?: { navigate?: boolean }) => {
    setDate(date);
    if (opts && opts.navigate) {
      navigate(`/calendar/${date.toISODate()}`);
    }
  };

  const days = useMemo(() => {
    const start = date.startOf("week");
    const end = date.endOf("week");

    return Interval.fromDateTimes(start, end)
      .splitBy({ day: 1 })
      .map((d) => d.start!);
  }, [date]);

  const evs = useMemo(() => events, [events, date]);

  useEffect(() => {}, []);

  return (
    <DateContext.Provider
      value={{
        currentDate: date,
        days,
        events,
        setEvents,
        setCurrentDate: setDateInter,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = () => {
  const ctx = useContext(DateContext);

  if (ctx == null) throw Error("date context not initialized");

  return ctx;
};
