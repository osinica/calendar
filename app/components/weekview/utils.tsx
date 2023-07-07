export const calculateStart = (dt: DateTime, round = false): number => {
  const minutesInDay = 24 * 60;
  const maxHeight = 24 * 56;
  const minuteInPx = maxHeight / minutesInDay;

  const startOfDay = dt.startOf("day");
  const diff = dt.diff(startOfDay, "minutes");

  if(round) {
    return Math.round(diff.toObject().minutes) * minuteInPx;
  } else {
  return diff.toObject().minutes * minuteInPx;}
};

export const calculateEnd = (start: DateTime, end: DateTime): number => {
  const minutesInDay = 24 * 60;
  const maxHeight = 24 * 56;
  const minuteInPx = maxHeight / minutesInDay;

  const diff = end.diff(start, "minutes");

  return diff.toObject().minutes * minuteInPx;
};
