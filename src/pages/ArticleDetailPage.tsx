import { useParams, useNavigate } from "react-router-dom";
import { useArticle } from "../hooks/useArticle";
import { useStudyRecord } from "../hooks/useStudyRecord";
import { toDateString } from "../lib/date";
import ArticleSection from "../components/today/ArticleSection";
import VocabSection from "../components/today/Vocabsection";
import GrammarSection from "../components/today/Grammarsection";

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useArticle(id ?? "");
  const { isCompleted, completeStudy, isPending } = useStudyRecord(id ?? "");
  const isToday = data?.published_date === toDateString(new Date());

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-400">
        불러오는 중...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 px-6 text-center">
        <p className="text-sm text-gray-400">기사를 불러올 수 없어요.</p>
        <button
          onClick={() => navigate("/archive")}
          className="text-xs text-[rgb(100,201,100)] underline"
        >
          아카이브로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="pb-6">
      {/* 뒤로가기 */}
      <div className="px-5 pt-5">
        <button
          onClick={() => navigate("/archive")}
          className="cursor-pointer text-sm text-gray-400 hover:text-gray-600"
        >
          ← 아카이브
        </button>
      </div>

      <ArticleSection
        title={data.title}
        body={data.body}
        translation={data.translation}
        category={data.category}
        publishedDate={data.published_date}
      />

      <div className="mx-5 border-t border-gray-100" />
      <VocabSection vocabularies={data.vocabularies} />

      <div className="mx-5 border-t border-gray-100" />
      <GrammarSection grammarPoints={data.grammar_points} />

      <div className="px-5 pt-4">
        <button
          onClick={() => completeStudy()}
          disabled={isCompleted || isPending || !isToday}
          className={`w-full rounded-xl py-3 text-sm font-bold transition-colors ${
            isCompleted || !isToday
              ? "cursor-default bg-gray-100 text-gray-400"
              : "bg-[rgb(100,201,100)] text-white hover:bg-[rgb(90,187,90)]"
          }`}
        >
          {isCompleted
            ? "🌱 학습 완료"
            : !isToday
              ? "이미 지난 학습이에요😿"
              : isPending
                ? "저장 중..."
                : "학습 완료"}
        </button>
      </div>
    </div>
  );
}
