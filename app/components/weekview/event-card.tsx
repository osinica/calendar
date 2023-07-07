import { DateTime } from "luxon";
import { CSSProperties, FunctionComponent, useEffect, useMemo } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ItemTypes } from "~/helper/dnd";
import { Event } from "../calendar";
import { calculateEnd, calculateStart } from "./utils";

export type EventCardProps = {
  event: Event
  calculatePosition?: boolean
};

export const EventCard: FunctionComponent<EventCardProps> = ({
  event,
  calculatePosition = true
}) => {
const {start, end, subject, id} = event;
  
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.EVENT,
    item: { start, end, subject, id },
    collect: (m) => ({
      isDragging: !!m.isDragging()
    })
  }), [start, end, subject])

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  const styles: CSSProperties = useMemo(() => calculatePosition ? { top: calculateStart(start), height: calculateEnd(start, end) } : { height: calculateEnd(start, end) }, [calculatePosition, start])

  return (
    <div
      className={`${isDragging ? "bg-fuchsia-200 border-4 border-fuchsia-300 p-1" : "bg-fuchsia-300 p-2"} w-full text-gray-700 rounded cursor-grab absolute left-0 z-[10] transform-none select-none`}
      style={styles}
      ref={drag}
      id={`${subject}`}
    >
      <div>{subject}</div>
      <div>
        {start.toFormat("HH:mm")} - {end.toFormat("HH:mm")}
      </div>
    </div>
  );
};

