import { useNavigate } from "react-router-dom";

const features = [
  {
    tag: "매일 학습",
    title: "매일 새로운\n일본어 뉴스 기사",
    description:
      "평일마다 엄선된 일본어 뉴스 기사 한 편이 업데이트돼요. 실제 뉴스 문장으로 자연스러운 일본어를 익혀보세요.",
    mockup: (
      <div className="rounded-2xl bg-white p-4 text-left shadow-sm">
        <div className="mb-1 text-xs text-gray-400">6月 4日 木曜日</div>
        <div className="mb-2 text-xs font-bold text-gray-700">
          生成AIの電力消費問題、省エネ技術の開発が急務
        </div>
        <div className="text-xs leading-relaxed text-gray-500">
          生成AIの急速な普及に伴い、データセンターの電力消費が急増している。国際エネルギー機関は...
        </div>
      </div>
    ),
  },
  {
    tag: "어휘 학습",
    title: "기사 속\n핵심 어휘 학습",
    description:
      "기사에서 뽑은 N2 핵심 어휘 3~5개를 단어, 읽기, 뜻과 함께 학습해요. 문맥 속에서 익히는 어휘는 더 오래 기억돼요.",
    mockup: (
      <div className="space-y-2 rounded-2xl bg-white p-4 shadow-sm">
        {[
          { word: "生成AI", reading: "せいせいエーアイ", meaning: "생성형 AI" },
          { word: "急務", reading: "きゅうむ", meaning: "급선무" },
          { word: "省エネ", reading: "しょうエネ", meaning: "에너지 절약" },
        ].map((v) => (
          <div
            key={v.word}
            className="flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2"
          >
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-gray-800">{v.word}</span>
              <span className="text-xs text-gray-400">{v.reading}</span>
            </div>
            <span className="text-xs text-gray-500">{v.meaning}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    tag: "문법 학습",
    title: "문법 포인트를\n예문으로 익히기",
    description:
      "기사에 등장한 N2 문법 패턴을 설명과 예문으로 정리해드려요. 이론이 아닌 실제 뉴스 문장 속에서 배워요.",
    mockup: (
      <div className="rounded-2xl bg-white p-4 text-left shadow-sm">
        <p className="mb-1 text-sm font-bold text-[rgb(100,201,100)]">
          〜が急務だ
        </p>
        <p className="mb-3 text-xs text-gray-500">
          어떤 일을 빨리 해야 하는 상황임을 강조한다. 「〜이 급선무다」
        </p>
        <div className="space-y-1 rounded-lg bg-gray-50 px-3 py-2">
          <p className="text-xs text-gray-700">
            少子化対策の強化が急務だと専門家は指摘している。
          </p>
          <p className="text-xs text-gray-400">
            저출산 대책 강화가 급선무라고 전문가들은 지적하고 있다.
          </p>
        </div>
      </div>
    ),
  },
  {
    tag: "스트릭",
    title: "매일 쌓이는\n학습 스트릭",
    description:
      "학습을 완료하면 스트릭이 쌓여요. 캘린더로 나의 학습 기록을 한눈에 확인하고 꾸준함을 유지해보세요.",
    mockup: (
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex gap-3">
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl bg-[rgb(100,201,100)] py-3">
            <span className="text-2xl font-bold text-white">4</span>
            <span className="text-xs text-white opacity-80">
              연속 학습일 🔥
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl bg-gray-50 py-3">
            <span className="text-2xl font-bold text-gray-700">8</span>
            <span className="text-xs text-gray-400">총 학습일</span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
            <div key={d} className="text-center text-xs text-gray-400">
              {d}
            </div>
          ))}
          {[null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((d, i) => (
            <div key={i} className="flex items-center justify-center">
              {d && (
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                    [2, 3, 4, 5, 9, 10, 11, 12].includes(d)
                      ? "bg-[rgb(100,201,100)] font-bold text-white"
                      : "text-gray-400"
                  }`}
                >
                  {d}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
        style={{
          backgroundImage: "url('/landingpage-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/40" />
        {/* 콘텐츠 */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-4 rounded-full bg-white/20 px-3 py-1">
            <span className="text-xs font-medium text-white">
              일본어 뉴스 학습 서비스
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white">모지모지</h1>
          <p className="mb-10 text-sm leading-relaxed text-white/80">
            매일 짧은 뉴스 기사 한 편으로
            <br />
            어휘와 문법을 함께 익혀요
          </p>
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer rounded-xl bg-[rgb(100,201,100)] px-10 py-3 text-sm font-bold text-white transition-colors hover:bg-[rgb(90,187,90)]"
          >
            시작하기
          </button>
          <p className="mt-4 text-xs text-white/50">무료로 시작할 수 있어요</p>
        </div>

        {/* 스크롤 유도 */}
        <div className="absolute bottom-10 flex animate-bounce flex-col items-center gap-1">
          <span className="text-xs text-gray-300">스크롤해서 더 보기</span>
          <span className="text-gray-300">↓</span>
        </div>
      </section>

      {/* Feature sections */}
      {features.map((feature, index) => (
        <section
          key={index}
          className="flex min-h-screen flex-col justify-center bg-[rgb(245,250,245)] px-6 py-16"
        >
          <div className="mb-2 inline-flex">
            <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-white">
              {feature.tag}
            </span>
          </div>
          <h2 className="mb-3 text-2xl leading-snug font-bold whitespace-pre-line text-gray-800">
            {feature.title}
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-gray-400">
            {feature.description}
          </p>
          {feature.mockup}
        </section>
      ))}

      {/* CTA */}
      <section className="flex min-h-[50vh] flex-col items-center justify-center bg-[rgb(100,201,100)] px-6 text-center">
        <h2 className="mb-3 text-2xl font-bold text-white">
          지금 바로 시작해보세요
        </h2>
        <p className="mb-8 text-sm text-white opacity-80">
          매일 5분, 꾸준한 일본어 학습
        </p>
        <button
          onClick={() => navigate("/login")}
          className="cursor-pointer rounded-xl bg-white px-10 py-3 text-sm font-bold text-[rgb(100,201,100)] transition-colors hover:bg-gray-50"
        >
          메일로 시작하기
        </button>
      </section>

      {/* Footer */}

      <footer className="flex flex-col gap-4 bg-gray-800 px-6 py-8">
        <p className="text-base font-bold text-white">모지모지</p>
        <div className="flex flex-col gap-1.5">
          <p className="text-xs text-gray-400">
            © 2026 모지모지. All rights reserved.
          </p>
          <a
            href="mailto:chechoii2e@gmail.com"
            className="text-xs text-gray-400 transition-colors hover:text-gray-200"
          >
            Contact: chechoii2e@gmail.com
          </a>
          <a
            href="https://github.com/choii2e/mojimoji"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 transition-colors hover:text-gray-200"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
