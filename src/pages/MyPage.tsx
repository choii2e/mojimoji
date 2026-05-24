import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function MyPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="p-6">
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
