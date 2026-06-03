import { toDateString } from "./date";

const getPrevDay = (date: Date): Date => {
  const prev = new Date(date);
  prev.setDate(prev.getDate() - 1);
  return prev;
};

// 현재 연속 학습일
export const calculateStreak = (studiedDates: string[]): number => {
  if (studiedDates.length === 0) return 0;

  const dateSet = new Set(studiedDates);
  const today = new Date();
  const todayStr = toDateString(today);

  // 오늘 학습했으면 오늘부터, 아니면 어제부터 카운트
  let current = dateSet.has(todayStr) ? today : getPrevDay(today);

  let streak = 0;
  while (dateSet.has(toDateString(current))) {
    streak++;
    current = getPrevDay(current);
  }

  return streak;
};

// 전체 학습 완료일 수
export const calculateTotalDays = (studiedDates: string[]): number => {
  return new Set(studiedDates).size;
};
