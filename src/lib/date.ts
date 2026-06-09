export const toDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// "2026-06-09" → "6월 9일"
export const formatDateKo = (dateStr: string): string => {
  const [, month, day] = dateStr.split("-");
  return `${parseInt(month)}월 ${parseInt(day)}일`;
};

// "2026-06-09" → "6月 9日 火曜日"
const DAYS = [
  "日曜日",
  "月曜日",
  "火曜日",
  "水曜日",
  "木曜日",
  "金曜日",
  "土曜日",
];

export const getJapaneseDate = (dateStr?: string) => {
  if (!dateStr) {
    const today = new Date();
    return `${today.getMonth() + 1}月${today.getDate()}日 ${DAYS[today.getDay()]}`;
  }
  const [yearStr, monthStr, dayStr] = dateStr.split("-");
  const year = parseInt(yearStr);
  const month = parseInt(monthStr);
  const day = parseInt(dayStr);
  const date = new Date(year, month - 1, day);
  return `${month}月${day}日 ${DAYS[date.getDay()]}`;
};
