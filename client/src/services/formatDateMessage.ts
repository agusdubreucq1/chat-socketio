import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
dayjs.extend(calendar)

export const formatDateMessage = (date) => {

  return dayjs(date).calendar(null, {
    sameDay: '[Today]', // The same day ( Today at 2:30 AM )
    nextWeek: 'dddd', // The next week ( Sunday at 2:30 AM )
    lastDay: '[Yesterday]', // The day before ( Yesterday at 2:30 AM )
    lastWeek: 'dddd', // Last week ( Last Monday at 2:30 AM )
    sameElse: 'DD/MM/YYYY', // Everything else ( 7/10/2011 )
  })
}
