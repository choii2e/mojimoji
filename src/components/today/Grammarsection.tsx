interface GrammarPoint {
  id: string;
  pattern: string;
  explanation: string;
  example_jp: string;
  example_kr: string;
  order_index: number;
}

interface Props {
  grammarPoints: GrammarPoint[];
}

export default function GrammarSection({ grammarPoints }: Props) {
  const sorted = [...grammarPoints].sort(
    (a, b) => a.order_index - b.order_index,
  );

  return (
    <section className="px-5 py-4">
      <h2 className="mb-3 text-sm font-bold text-gray-700">✏️문법 포인트</h2>
      <div className="flex flex-col gap-3">
        {sorted.map((grammar) => (
          <div
            key={grammar.id}
            className="rounded-xl border border-gray-100 bg-white px-4 py-4 shadow-sm"
          >
            {/* 문형 */}
            <p className="mb-1 text-sm font-bold text-[rgb(100,201,100)]">
              {grammar.pattern}
            </p>
            {/* 설명 */}
            <p className="mb-3 text-xs text-gray-500">{grammar.explanation}</p>
            {/* 예문 */}
            <div className="flex flex-col gap-1 rounded-lg bg-gray-50 px-3 py-2">
              <p className="text-xs text-gray-700">{grammar.example_jp}</p>
              <p className="text-xs text-gray-400">{grammar.example_kr}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
