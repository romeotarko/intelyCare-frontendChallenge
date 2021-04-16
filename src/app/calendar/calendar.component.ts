import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
} from "@fullcalendar/angular";
import { Sound, SoundService } from "../services/sound.service";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"],
})
export class CalendarComponent implements OnInit {

  options: CalendarOptions;
  currentEvents: EventApi[] = [];

  constructor(private soundService: SoundService) {}

  async ngOnInit() {

  const toCalendarEvent = (sound: Sound):any => new Object({ title: sound.title,id: Date.now().toString, start: sound.release_date })
  
   await this.soundService
    .fetchAllSounds()
    .then(data => {
      this.currentEvents = data.map(toCalendarEvent)
    })
    .catch(error => alert("Error while fetching the data"));

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
      //this.currentEvents not working
     // events: this.currentEvents,

     // trying local URL
      events:"src/assets/events.json", 

      initialView: "dayGridMonth",
      weekends: true,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect,
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    };
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
}
function createEventId(): string {
  throw new Error("Function not implemented.");
}
