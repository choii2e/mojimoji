import { useState } from "react";

const DAYS = [
  "日曜日",
  "月曜日",
  "火曜日",
  "水曜日",
  "木曜日",
  "金曜日",
  "土曜日",
];

const getJapaneseToday = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDay();
  const dayOfWeek = DAYS[today.getDay()];
  return `${month}月${day}日 ${dayOfWeek}`;
};

const categoryLabel: Record<string, string> = {
  society: "사회",
  economy: "경제",
  culture: "문화",
  technology: "기술",
  environment: "환경",
};

const categoryColor: Record<string, string> = {
  society: "bg-blue-100 text-blue-600",
  economy: "bg-yellow-100 text-yellow-600",
  culture: "bg-purple-100 text-purple-600",
  technology: "bg-cyan-100 text-cyan-600",
  environment: "bg-green-100 text-green-600",
};

interface Props {
  title: string;
  body: string;
  translation: string;
  category: string;
}

export default function ArticleSection({
  title,
  body,
  translation,
  category,
}: Props) {
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <section className="px-5 pt-6 pb-4">
      {/* 날짜 & 카테고리 */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${categoryColor[category]}`}
        >
          {categoryLabel[category]}
        </span>
        <span className="text-sm font-bold text-gray-600">
          {getJapaneseToday()}
        </span>
      </div>

      {/* 제목 */}
      <h1 className="mb-4 text-base leading-snug font-bold text-gray-800">
        {title}
      </h1>

      {/* 기사 본문 */}
      <div className="mb-3 rounded-xl bg-gray-50 p-4">
        <p className="text-sm leading-loose text-gray-700">{body}</p>
      </div>

      {/* 번역 토글 */}
      <button
        onClick={() => setShowTranslation(!showTranslation)}
        className="flex-items-center w-full justify-center gap-1 py-2 text-xs text-gray-400 transition-colors hover:text-gray-600"
      >
        <span>{showTranslation ? "번역 숨기기" : "번역 보기"}</span>
      </button>

      {/* 번역 */}
      {showTranslation && (
        <div className="mt-1 rounded-xl bg-[rgb(220,233,220)] p-4">
          <p className="text-sm leading-loose text-gray-600">{translation}</p>
        </div>
      )}
    </section>
  );
}
