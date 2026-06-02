import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";
import { getLocalDateString } from "../lib/date";

// 오늘 학습 완료 여부 확인
const fetchStudyRecord = async (userId: string, articleId: string) => {
  const { data, error } = await supabase
    .from("study_records")
    .select("id, is_completed")
    .eq("user_id", userId)
    .eq("article_id", articleId)
    .maybeSingle();

  if (error) throw error;
  return data;
};

// 학습 완료 저장
const insertStudyRecord = async (userId: string, articleId: string) => {
  const today = getLocalDateString();

  const { error } = await supabase.from("study_records").upsert({
    user_id: userId,
    article_id: articleId,
    studied_at: today,
    is_completed: true,
  });

  if (error) throw error;
};

export const useStudyRecord = (articleId: string) => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: record } = useQuery({
    queryKey: ["study-record", articleId],
    queryFn: () => fetchStudyRecord(user!.id, articleId),
    enabled: !!user && !!articleId,
  });

  const { mutate: completeStudy, isPending } = useMutation({
    mutationFn: () => insertStudyRecord(user!.id, articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-record", articleId] });
    },
  });

  return {
    isCompleted: record?.is_completed ?? false,
    completeStudy,
    isPending,
  };
};
