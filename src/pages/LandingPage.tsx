import { useNavigate } from "react-router";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">모지모지</h1>
      <p className="text-sm text-gray-400">일본어 뉴스 학습 서비스</p>
      <button
        onClick={() => navigate("/login")}
        className="hover:bg-[rgb(90, 187, 90)] rounded-xl bg-[rgb(100,201,100)] px-8 py-3 text-sm font-bold text-white"
      >
        시작하기
      </button>
    </div>
  );
}
