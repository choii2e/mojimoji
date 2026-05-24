import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) return null;

  if (user) return <Navigate to="/today" replace />;

  const getErrorMessage = (message: string) => {
    if (message.includes("Invalid login credentials")) {
      return "이메일 또는 비밀번호가 올바르지 않아요";
    }
    if (message.includes("invalid format")) {
      return "이메일 형식을 확인해주세요";
    }
    if (message.includes("Password should be at least")) {
      return "비밀번호는 6자 이상이어야 해요";
    }
    if (message.includes("User already registered")) {
      return "이미 가입된 이메일이에요";
    }
    return "오류가 발생했어요. 다시 시도해주세요";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    setSubmitting(false);

    if (error) {
      setError(getErrorMessage(error.message));
    } else {
      navigate("/today", { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-sm rounded-2xl bg-[rgb(220,233,220)] p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">모지모지</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgb(99,183,99)]"
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgb(99,183,99)]"
            required
          />

          {error && <p className="text-xs text-[rgb(253,86,95)]">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="cursor-pointer rounded-lg bg-[rgb(100,201,100)] py-2 text-sm font-medium text-white hover:bg-[rgb(90,187,90)] disabled:opacity-50"
          >
            {submitting ? "처리 중..." : isSignUp ? "회원가입" : "로그인"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-400">
          {isSignUp ? "이미 계정이 있나요?" : "계정이 없나요?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[rgb(99,183,99)] underline"
          >
            {isSignUp ? "로그인" : "회원가입"}
          </button>
        </p>
      </div>
    </div>
  );
}
