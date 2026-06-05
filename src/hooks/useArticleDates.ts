import { useQuery } from "@tanstack/react-query";
import { toDateString } from "../lib/date";
import { supabase } from "../lib/supabase";

const fetchArticleDates = async () => {
  const today = toDateString(new Date());

  const { data, error } = await supabase
    .from("articles")
    .select("published_date")
    .lt("published_date", today); // 오늘 이전 기사만 (오늘은 아직 학습 가능)

  if (error) throw error;
  return data.map((a) => a.published_date);
};

export const useArticleDates = () => {
  return useQuery({
    queryKey: ["article-dates"],
    queryFn: fetchArticleDates,
  });
};
