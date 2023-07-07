import { FunctionComponent, PropsWithChildren } from "react";
import { useDateContext } from "../context/date-context";
import { Button } from "../button";
import { DateTime } from "luxon";

export const WeekViewHeader: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { currentDate, days, setCurrentDate } = useDateContext();
  return (
    <>
      <div className="flex flew-row justify-between items-center my-8 ml-[100px] mr-4 text-white">
        <div className="underline text-xl font-ibm-plex lowercase">
          {currentDate.toFormat("MMMM yy")}</div>
        <div className="flex flex-row items-center select-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2 cursor-pointer" onClick={() => setCurrentDate(currentDate.minus({weeks: 1}))}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <div><Button onClick={() => setCurrentDate(DateTime.now())}>today</Button></div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 cursor-pointer" onClick={() => setCurrentDate(currentDate.plus({weeks: 1}))}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>

        </div>
      </div>
      <div className="relative" style={{ overflow: "hidden auto" }}>
        <div className="sticky top-0 left-0 z-50 bg-gray-700">
          <div>
            <div
              className="grid select-none"
              style={{ gridTemplateColumns: "100px repeat(7,1fr)" }}
            >
              {[null, ...days].map((d, i) => (
                <div
                  className="flex items-center justify-center cursor-default pb-3 text-sm text-gray-500 uppercase"
                  key={i}
                >
                  {d != null ? d?.toFormat("EEE d") : ""}
                </div>
              ))}
              <div
                className="grid border-gray-500 h-8 overflow-y-[unset] overflow-x-hidden"
                style={{
                  gridTemplateColumns: "100px repeat(7,1fr)",
                  gridColumn: "1 / 9",
                }}
              >
                {Array(8)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="flex flex-col justify-start relative border-l border-t border-b h-full border-gray-600 first:border-0 first:border-transparent"></div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};
