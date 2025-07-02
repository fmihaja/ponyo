//react
import { useState } from "react";
//full calendar
import FullCalendar from "@fullcalendar/react";
import frLocale from "@fullcalendar/core/locales/fr";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
//shadcn
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
//lucide react

//dayjs

//component
import ScheduleAdd from "@/components/ScheduleAdd";

//type
import type { ScheduleEvent } from "@/types/ScheduleEvent";
import ScheduleSubjectSetting from "@/components/ScheduleSubjectSetting";

function Schedule() {
    const [events, setEvents] = useState<ScheduleEvent[]>([]);
    const [classeFilter, setClasseFilter] = useState<string>("all");
    const [subjectFilter, setSubjectFilter] = useState<string>("all");

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center gap-7 py-5">
                <div className="w-full flex justify-start items-center px-5">
                    <h1 className="text-4xl font-semibold">Emploie Du Temps</h1>
                </div>
                <div className="h-20 w-[90%] flex justify-center items-center">
                    <div className="w-1/2 flex justify-start items-center gap-3">
                        <ScheduleAdd setEvents={setEvents} events={events} />
                        {/* setting */}
                        <ScheduleSubjectSetting
                            setEvents={setEvents}
                            events={events}
                        />
                    </div>
                    <div className="w-1/2 flex justify-end items-center gap-7">
                        <Select
                            onValueChange={(val: string) =>
                                setClasseFilter(val)
                            }
                        >
                            <SelectTrigger className="w-auto">
                                <SelectValue placeholder="Filtrer par classe" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">
                                    Afficher: Tous les classes
                                </SelectItem>
                                <SelectItem value="classe a">
                                    Afficher: Classe A
                                </SelectItem>
                                <SelectItem value="classe b">
                                    Afficher: Classe B
                                </SelectItem>
                                <SelectItem value="classe c">
                                    Afficher: Classe C
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            onValueChange={(val: string) =>
                                setSubjectFilter(val)
                            }
                        >
                            <SelectTrigger className="w-auto">
                                <SelectValue placeholder="Filtrer par matiere" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Afficher: Tous les matieres
                                </SelectItem>
                                <SelectItem value="svt">
                                    Afficher: SVT
                                </SelectItem>
                                <SelectItem value="mth">
                                    Afficher: MTH
                                </SelectItem>
                                <SelectItem value="eng">
                                    Afficher: ENG
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="w-[90%]">
                    <FullCalendar
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            listPlugin,
                            interactionPlugin,
                        ]}
                        // déclarer et sélectionner le français
                        locales={[frLocale]}
                        locale="fr"
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,listWeek",
                        }}
                        initialView="timeGridWeek"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        hiddenDays={[0]} //0:dim,1:lundi, etc ...
                        slotMinTime="07:00:00"
                        slotMaxTime="18:00:00"
                        businessHours={[
                            {
                                daysOfWeek: [1, 2, 3, 4, 5, 6], // du lundi (1) au samedi (6)
                                startTime: "07:00",
                                endTime: "12:00",
                            },
                            {
                                daysOfWeek: [1, 2, 3, 4, 5, 6],
                                startTime: "14:00",
                                endTime: "18:00",
                            },
                        ]}
                        dayHeaderClassNames={() => ["capitalize"]}
                        contentHeight="auto"
                        // initialEvents={defaultEvents}
                        events={events.filter(
                            (event) =>
                                (classeFilter == "all" ||
                                    event.classe == classeFilter) &&
                                (subjectFilter == "all" ||
                                    event.subject == subjectFilter)
                        )}

                        // weekends={weekendsVisible}
                        // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                        // select={handleDateSelect}
                        // eventContent={renderEventContent} // custom render function
                        // eventClick={handleEventClick}
                        // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                        /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
                    />
                </div>
            </div>
        </>
    );
}

export default Schedule;
