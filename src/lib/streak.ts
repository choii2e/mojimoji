import { toDateString } from "./date";

const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

// 이전 평일로 이동 (주말 건너뜀)
const getPrevWeekday = (date: Date): Date => {
  const prev = new Date(date);
  prev.setDate(prev.getDate() - 1);
  while (isWeekend(prev)) {
    prev.setDate(prev.getDate() - 1);
  }
  return prev;
};

// 현재 스트릭 계산 (평일만)
export const calculateStreak = (studiedDates: string[]): number => {
  if (studiedDates.length === 0) return 0;

  const dateSet = new Set(studiedDates);
  const today = new Date();

  // 오늘이 주말이면 가장 최근 평일(금요일)로 이동
  let current = new Date(today);
  while (isWeekend(current)) {
    current.setDate(current.getDate() - 1);
  }

  // 가장 최근 평일에 학습 기록이 없으면 전 평일로 이동
  // (오늘 아직 학습 안 했어도 스트릭 유지)
  if (!dateSet.has(toDateString(current))) {
    current = getPrevWeekday(current);
  }

  let streak = 0;
  while (dateSet.has(toDateString(current))) {
    streak++;
    current = getPrevWeekday(current);
  }

  return streak;
};

// 전체 학습 완료일 수
export const calculateTotalDays = (studiedDates: string[]): number => {
  return new Set(studiedDates).size;
};
