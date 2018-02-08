import request from 'superagent';

const CALENDAR_ID = 'dextra-sw.com_qnjnlid82n2q828uflo4187fq0@group.calendar.google.com';
const API_KEY = 'AIzaSyBjP3oziR_ztTBkfgQFvXLBnp9w6n96mjE';
let url = 'https://www.googleapis.com/calendar/v3/calendars/'+CALENDAR_ID+'/events?key='+API_KEY;

export function getEvents (callback) {
  request
    .get(url)
    .end((err, resp) => {
      if (!err) {
        const events = []
        JSON.parse(resp.text).items.map((event) => {
        console.log (new Date().toISOString("YYYY-MM-DDTHH:MM:SSZ"));
        console.log ("DATA: "+event.start.date);
        //if (event.start.date == new Date().toLocaleString()){
          events.push({
            start: event.start.date || event.start.dateTime,
            end: event.end.date || event.end.dateTime,
            title: event.summary,
          })
       //}
        });
        console.log(events);
        callback(events);
      }
    })
}