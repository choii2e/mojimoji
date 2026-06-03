import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";

const fetchStudyHistory = async (userId: string) => {
  const { data, error } = await supabase
    .from("study_records")
    .select("studied_at, is_completed")
    .eq("user_id", userId)
    .eq("is_completed", true)
    .order("studied_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const useStudyHistory = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["study-history", user?.id],
    queryFn: () => fetchStudyHistory(user!.id),
    enabled: !!user,
  });
};
