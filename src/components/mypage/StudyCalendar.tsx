import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toDateString } from "../../lib/date";

interface Props {
  studiedDates: string[];
}

export default function StudyCalendar({ studiedDates }: Props) {
  const dateSet = new Set(studiedDates);

  const tileClassName = ({ date }: { date: Date }) => {
    if (dateSet.has(toDateString(date))) {
      return "studied-day";
    }
    return null;
  };

  return (
    <div className="calendar-wrapper">
      <Calendar
        tileClassName={tileClassName}
        locale="ko-KR"
        maxDate={new Date()}
        formatDay={(_, date) => String(date.getDate())}
      />
    </div>
  );
}
