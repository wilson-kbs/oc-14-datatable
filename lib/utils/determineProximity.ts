/**
 * Determine the proximity of the current page to the start, middle, or end of the pagination.
 * @param count - The current page number.
 * @param pad - The number of pages to show on the left and right of the current page.
 * @param end - The total number of pages.
 * @param start - The starting page number.
 */
export function determineProximity(
  count: number,
  pad: number,
  end: number,
  start: number = 1,
): "start" | "middle" | "end" {
  if (count <= start + pad) {
    return "start";
  } else if (count >= end - pad) {
    return "end";
  } else {
    return "middle";
  }
}
