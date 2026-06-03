import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { toDateString } from "../lib/date";

const fetchTodayArticle = async () => {
  const today = toDateString(new Date());

  const { data, error } = await supabase
    .from("articles")
    .select(
      `
      *,
      vocabularies ( * ),
      grammar_points ( * )
    `,
    )
    .eq("published_date", today)
    .single();

  if (error) throw error;
  return data;
};

export const useTodayArticle = () => {
  const today = toDateString(new Date());

  return useQuery({
    queryKey: ["today-article", today],
    queryFn: fetchTodayArticle,
  });
};
