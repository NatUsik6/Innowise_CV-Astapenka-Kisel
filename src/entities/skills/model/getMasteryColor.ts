import { Mastery } from "./types";

export const getMasteryColor = (mastery: Mastery): string => {
  switch (mastery) {
    case Mastery.Novice:
      return '#9e9e9e';
    case Mastery.Advanced:
      return '#e53935';
    case Mastery.Competent:
      return '#ef6c00';
    case Mastery.Proficient:
      return '#f9a825';
    case Mastery.Expert:
      return '#43a047';
    default:
      return '#9e9e9e';
  }
};
