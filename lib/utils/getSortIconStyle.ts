import SortASC from "../assets/sort_asc.png";
import SortDESC from "../assets/sort_desc.png";
import SortBoth from "../assets/sort_both.png";

type SortIconStyle = {
  /**
   * The background image URL for the sort icon.
   */
  backgroundImage: string;
};

/**
 * Returns the style object for the sort icon based on the given direction.
 *
 * @param direction - The direction of the sort.
 * @returns  - The style object containing the background image URL.
 */
export const getSortIconStyle = (
  direction: "asc" | "desc" | "both" = "both",
): SortIconStyle => {
  const icon = {
    asc: SortASC,
    desc: SortDESC,
    both: SortBoth,
  }[direction];

  return {
    backgroundImage: `url(${icon})`,
  };
};
