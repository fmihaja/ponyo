import type { EventInput } from "@fullcalendar/core/index.js";

export type ScheduleEvent = EventInput & {
    classe: string;
    subject: string;
    theme?: string;
};