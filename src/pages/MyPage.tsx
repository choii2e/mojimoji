import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";
import { useStudyHistory } from "../hooks/useStudyHistory";
import { calculateStreak, calculateTotalDays } from "../lib/streak";
import StudyCalendar from "../components/mypage/StudyCalendar";

export default function MyPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data: history, isLoading } = useStudyHistory();

  const dates = history?.map((r) => r.studied_at) ?? [];
  const streak = calculateStreak(dates);
  const totalDays = calculateTotalDays(dates);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-400">
        불러오는 중...
      </div>
    );
  }

  return (
    <div className="px-5 pt-6 pb-6">
      {/* 유저 이메일 */}
      <p className="mb-6 text-xs text-gray-400">
        こんにちは！{user?.email?.split("@")[0]} 님
      </p>

      {/* 스트릭 & 총 학습일 */}
      <div className="mb-6 flex gap-3">
        <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl bg-[rgb(100,201,100)] py-5">
          <span className="text-3xl font-bold text-white">{streak}</span>
          <span className="text-xs text-white opacity-80">현재 스트릭 🔥</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl bg-gray-50 py-5">
          <span className="text-3xl font-bold text-gray-700">{totalDays}</span>
          <span className="text-xs text-gray-400">총 학습일</span>
        </div>
      </div>

      {/* 캘린더 */}
      <div className="mb-6">
        <h2 className="mb-3 text-sm font-bold text-gray-700">🗓️ 학습 캘린더</h2>
        <StudyCalendar studiedDates={dates} />
      </div>

      {/* 학습 기록 */}
      <div className="mb-6">
        <h2 className="mb-3 text-sm font-bold text-gray-700">🤓 학습 기록</h2>
        {dates.length === 0 ? (
          <p className="py-6 text-center text-xs text-gray-300">
            아직 학습 기록이 없어요
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {history?.slice(0, 7).map((record) => (
              <div
                key={record.studied_at}
                className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
              >
                <span className="text-sm text-gray-600">
                  {record.studied_at}
                </span>
                <span className="text-xs text-[rgb(100,201,100)]">✅ 완료</span>
              </div>
            ))}
            {(history?.length ?? 0) > 7 && (
              <p className="pt-1 text-center text-xs text-gray-300">
                최근 7일 기록만 표시돼요
              </p>
            )}
          </div>
        )}
      </div>

      {/* 로그아웃 */}
      <div className="flex justify-center">
        <button
          onClick={handleLogout}
          className="w-1/2 cursor-pointer rounded-lg border border-gray-200 py-2 text-sm text-gray-400 hover:bg-gray-50"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
