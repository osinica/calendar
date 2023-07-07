import { DateTime } from "luxon";
import { FunctionComponent, useEffect, useRef } from "react";
import { calculateStart } from "./utils";

export const HourCol: FunctionComponent = () => {
  const viewRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.scrollIntoView({ behavior: "instant", block: "center" })
    }
  }, [viewRef])

  return (
    <div>
      <div className="w-full h-full flex relative flex-col">
        {Array(24)
          .fill(null)
          .map((_, j) => DateTime.fromObject({ hour: j + 1 }))
          .map((x, i) => {
            const ref = x.get("hour") === 12 ? { ref: viewRef } : {}
            return <div key={i} className="h-full relative last:opacity-0 select-none">
              <div className="absolute bottom-0 w-full flex z-[1] justify-end items-center translate-y-1/2">
                <div className="mr-4 text-gray-500 text-sm" id={`time-${x.toFormat("HH")}`} {...ref}>
                  {x.toFormat("HH:mm")}
                </div>
              </div>
            </div>
          })}
      </div>
    </div>
  );
};

