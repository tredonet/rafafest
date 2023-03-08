import yes from "@/assets/icons/check-circle.svg";
import no from "@/assets/icons/times-circle.svg";
import maybe from "@/assets/icons/question-circle.svg";
import rsvp from "@/assets/icons/clock.svg";

export function attendanceIcon(attending: "yes" | "no" | "maybe" | null) {
  if (!attending) return rsvp;
  const icons = {
    yes,
    no,
    maybe,
  };
  return icons[attending];
}
