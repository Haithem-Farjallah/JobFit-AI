import { Component } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  events: any[] = [
    { id: '1', title: 'event 1', date: '2025-03-03' },
    { id: '2', title: 'event 2', date: '2025-03-03' },
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: (arg) => this.handleEventClick(arg),
    events: this.events,
    weekends: false,
  };

  handleDateClick(arg: any) {
    const title = prompt('Enter event title:');
    if (title) {
      const newEvent = {
        id: String(this.events.length + 1),
        title,
        date: arg.dateStr,
      };
      this.events = [...this.events, newEvent];
      this.calendarOptions = { ...this.calendarOptions, events: this.events };
    }
  }

  handleEventClick(arg: EventClickArg) {
    if (confirm(`Do you want to delete the event: ${arg.event.title}?`)) {
      this.events = this.events.filter((event) => event.id !== arg.event.id);
      this.calendarOptions = { ...this.calendarOptions, events: this.events };
    }
  }
}
