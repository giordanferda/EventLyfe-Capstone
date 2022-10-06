export function compareDates(start, end) {
  if (start.length === 0 || end.length === 0) {
    return true;
  }
  start = start
    .split("-")
    .map((el) => parseInt(el))
    .reduce((acc, el) => acc + el);
  end = end
    .split("-")
    .map((el) => parseInt(el))
    .reduce((acc, el) => acc + el);
  return start <= end;
}
