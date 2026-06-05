import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toDateString } from "../../lib/date";

interface Props {
  studiedDates: string[];
  articleDates: string[];
}

export default function StudyCalendar({ studiedDates, articleDates }: Props) {
  const studiedSet = new Set(studiedDates);
  const missedSet = new Set(articleDates.filter((d) => !studiedSet.has(d)));

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return null;
    const dateStr = toDateString(date);
    if (studiedSet.has(dateStr)) return "studied-day";
    if (missedSet.has(dateStr)) return "missed-day";
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
