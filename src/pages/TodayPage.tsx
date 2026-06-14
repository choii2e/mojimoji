import { useTodayArticle } from "../hooks/useTodayArticle";
import ArticleSection from "../components/today/ArticleSection";
import VocabSection from "../components/today/Vocabsection";
import GrammarSection from "../components/today/Grammarsection";
import { useStudyRecord } from "../hooks/useStudyRecord";
import { Toast } from "../lib/swal";
import LoadingSpinner from "../components/LoadingSpinner";

export default function TodayPage() {
  const { data, isLoading, isWeekend } = useTodayArticle();
  const { isCompleted, completeStudy, isPending } = useStudyRecord(
    data?.id ?? "",
  );

  if (isWeekend) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 px-6 text-center">
        <p className="text-sm text-gray-400">오늘의 학습 콘텐츠가 없어요. 😊</p>
        <p className="text-xs text-gray-300">주말에는 쉬어갑니다.</p>
      </div>
    );
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="pb-6">
      <ArticleSection
        title={data.title}
        body={data.body}
        translation={data.translation}
      />

      <div className="mx-5 border-t border-gray-100" />

      <VocabSection vocabularies={data.vocabularies} />

      <div className="mx-5 border-t border-gray-100" />

      <GrammarSection grammarPoints={data.grammar_points} />

      <div className="flex justify-center px-5 pt-4">
        <button
          onClick={() =>
            completeStudy(undefined, {
              onSuccess: () => {
                Toast.fire({
                  icon: "success",
                  title: "오늘 학습 완료! 🎉",
                  text: "내일도 함께 학습해요",
                });
              },
            })
          }
          disabled={isCompleted || isPending}
          className={`w-1/2 rounded-xl py-3 text-sm font-bold transition-colors ${isCompleted ? "cursor-default bg-gray-100 text-gray-400" : "cursor-pointer bg-[rgb(100,201,100)] text-white hover:bg-[rgb(90,187,90)]"}`}
        >
          {isCompleted
            ? "🌱 오늘 학습 완료"
            : isPending
              ? "저장 중..."
              : "학습 완료"}
        </button>
      </div>
    </div>
  );
}
