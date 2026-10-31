import React from 'react';

export default function CalendarWidget() {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-lg font-semibold mb-3">Calendar</h2>
      <iframe
        src="https://calendar.google.com/calendar/embed?height=300&wkst=1&bgcolor=%23ffffff&ctz=local&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0"
        className="w-full h-[300px] rounded-xl border-0 bg-white"
        title="Google Calendar"
      />
    </div>
  );
}