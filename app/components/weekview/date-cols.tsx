import { FunctionComponent } from "react";
import { useDateContext } from "../context/date-context";
import { DateTime } from "luxon";
import { EventCard } from "./event-card";
import { sameDay } from "../date-picker/utils";
import { useDrop } from "react-dnd";
import { ItemTypes } from "~/helper/dnd";
import { DragLayer } from "../dnd/drag-layer";

export const DateCols: FunctionComponent = () => {
  const { days, events } = useDateContext();

  return (
    <>
      {days.map((d) => (
        <div
          className="border-l border-gray-600 w-full h-full relative"
          key={d?.toISODate()}
        >
          {Array(24)
            .fill(null)
            .map((_, i) => (
              <div
                className="relative border-b h-14 border-gray-600"
                key={i}
              ></div>
            ))}
          <EventColumn events={events} day={d} />
        </div>
      ))}
    </>
  );
};

type EvProps = {
  events: any[]
  day: DateTime
}

const EventColumn: FunctionComponent<EvProps> = ({ events, day }) => {
  const [{ pos }, drop] = useDrop(() => ({
    accept: ItemTypes.EVENT,
    collect: m => ({
      pos: m.getClientOffset()
    }),
    drop: (item, monitor) => {console.log("dropped: ", item.subject, " at ", monitor.getDifferenceFromInitialOffset())}
  }))

  return <div className="absolute h-full w-[calc(100%-12px)] top-0 left-0" ref={drop}>
    {events
      .filter((e) => sameDay(e.start, day))
      .map((x, j) => (
        <EventCard key={j} event={x} />
      ))}
  </div>

}