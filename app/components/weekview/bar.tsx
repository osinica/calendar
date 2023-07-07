import { FunctionComponent, useEffect, useState } from "react";
import { calculateStart } from "./utils";
import { DateTime } from "luxon";

export const Bar: FunctionComponent = () => {
  const [top, setTop] = useState(calculateStart(DateTime.now().plus({ hour: 1 }), true))

  useEffect(( ) => {
    const t = setInterval(() => {
      setTop(calculateStart(DateTime.now().plus({hour: 1}), true))
    }, 60 * 1000)

    return () => clearInterval(t)
  }, [])

  return <div className="absolute border border-fuchsia-200 w-full opacity-50" style={{ top }} />
}