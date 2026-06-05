import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArchive } from "../hooks/useArchive";
import { categoryColor, categoryLabel } from "../lib/category";

// 기사 목록을 월별로 그룹핑
const groupByMonth = (
  articles: {
    id: string;
    published_date: string;
    title: string;
    category: string;
  }[],
) => {
  const groups: Record<string, typeof articles> = {};

  articles.forEach((article) => {
    const [year, month] = article.published_date.split("-");
    const key = `${year}년 ${parseInt(month)}월`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(article);
  });

  return groups;
};

export default function ArchivePage() {
  const navigate = useNavigate();
  const { data: articles, isLoading } = useArchive();

  const grouped = articles ? groupByMonth(articles) : {};
  const months = Object.keys(grouped);

  const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({});

  // openMonths에 없으면 첫 번째 월은 기본 열림, 나머지는 기본 닫힘
  const isOpen = (month: string, index: number) => {
    if (month in openMonths) return openMonths[month];
    return index === 0;
  };

  const toggleMonth = (month: string, index: number) => {
    setOpenMonths((prev) => ({ ...prev, [month]: !isOpen(month, index) }));
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
      <h1 className="mb-4 text-base font-bold text-gray-800">아카이브</h1>

      {months.length === 0 ? (
        <p className="py-12 text-center text-sm text-gray-300">
          아직 지난 기사가 없어요
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {months.map((month, index) => (
            <div
              key={month}
              className="overflow-hidden rounded-2xl border border-gray-100"
            >
              {/* 월 헤더 */}
              <button
                onClick={() => toggleMonth(month, index)}
                className="flex w-full cursor-pointer items-center justify-between bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100"
              >
                <span className="text-sm font-bold text-gray-700">{month}</span>
                <span className="text-xs text-gray-400">
                  {isOpen(month, index) ? "▲" : "▼"}
                </span>
              </button>

              {/* 기사 목록 */}
              {isOpen(month, index) && (
                <div className="flex max-h-133 flex-col divide-y divide-gray-50 overflow-y-auto">
                  {grouped[month].map((article) => (
                    <button
                      key={article.id}
                      onClick={() => navigate(`/archive/${article.id}`)}
                      className="flex cursor-pointer flex-col gap-2 px-4 py-4 text-left transition-colors hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {article.published_date}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${categoryColor[article.category]}`}
                        >
                          {categoryLabel[article.category]}
                        </span>
                      </div>
                      <p className="text-sm leading-snug text-gray-700">
                        {article.title}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
