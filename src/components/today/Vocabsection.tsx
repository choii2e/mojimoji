interface Vocab {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  order_index: number;
}

interface Props {
  vocabularies: Vocab[];
}

export default function VocabSection({ vocabularies }: Props) {
  const sorted = [...vocabularies].sort(
    (a, b) => a.order_index - b.order_index,
  );

  return (
    <section className="px-5 py-4">
      <h2 className="mb-3 text-sm font-bold text-gray-700">📚핵심 어휘</h2>
      <div className="flex flex-col gap-2">
        {sorted.map((vocab) => (
          <div
            key={vocab.id}
            className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-gray-800">
                {vocab.word}
              </span>
              <span className="text-xs text-gray-400">{vocab.reading}</span>
            </div>
            <span className="text-sm text-gray-500">{vocab.meaning}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
