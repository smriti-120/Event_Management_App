import { Event } from "../types/event";

/**
 * Checks if newEvent conflicts with existing events based on venue and date.
 * Ignores the event with excludeId (for updating).
 */
export const isConflict = (
  events: Event[],
  newEvent: Event,
  excludeId?: string
): boolean => {
  return events.some(
    (e) =>
      e.id !== excludeId &&
      e.venue.toLowerCase() === newEvent.venue.toLowerCase() &&
      e.date === newEvent.date
  );
};
