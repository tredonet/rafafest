
import type { Circle } from "@rafafest/core";

export function circleColour(circle: Circle): string {
  const colours = {
    wolfach: "#005198",
    freiburg: "#CE2638",
    utrecht: "#CC0000",
    budapest: "#436F4D",
    valencia: "#FCDD09",
    bolt: "#34D186",
    nagua: "#002D62",
    gigtor: "#77D848",
    alongtheway: "#7C62FF",
    "+1": "",
  };
  return colours[circle];
}
