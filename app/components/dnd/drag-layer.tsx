import { CSSProperties, FunctionComponent } from "react";
import { DragLayerMonitor, XYCoord, useDragLayer } from "react-dnd";
import { ItemTypes } from "~/helper/dnd";
import { snapToGrid } from "./snap";
import { EventCard } from "../weekview/event-card";
import { useDateContext } from "../context/date-context";
import { sameDay } from "../date-picker/utils";

const layerStyles: CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 150,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%"
}

const getItemStyles = (initalOffset: XYCoord | null, currentOffset: XYCoord | null): CSSProperties => {
  if (!initalOffset || !currentOffset) return { display: "none" }

  let { y } = currentOffset
  let { x } = initalOffset

  y -= initalOffset.y
    ;[x, y] = snapToGrid(x, y)
  y += initalOffset.y

  const transform = `translate(${x}px, ${y}px)`

  return {
    transform,
    WebkitTransform: transform
  }
}

export const DragLayer: FunctionComponent = () => {
  const { item, itemType, initialOffset, currentOffset, isDragging } = useDragLayer(m => {
    return {
      item: m.getItem(),
      itemType: m.getItemType(),
      initialOffset: m.getInitialSourceClientOffset(),
      currentOffset: m.getSourceClientOffset(),
      isDragging: m.isDragging()
    }
  })

  const renderItem = () => {
    switch (itemType) {
      case ItemTypes.EVENT:
        return <EventCard event={item}  calculatePosition={false} />
      default:
        return null;
    }
  }

  if (!isDragging) {
    return null;
  } else {
    return (
      <div style={layerStyles}>
        <div style={getItemStyles(initialOffset, currentOffset)}>
          {renderItem()}
        </div>
      </div>
    )
  }
}