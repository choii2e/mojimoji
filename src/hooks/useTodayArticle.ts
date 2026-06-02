import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { getLocalDateString } from "../lib/date";

const fetchTodayArticle = async () => {
  const today = getLocalDateString();

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
  const today = getLocalDateString();

  return useQuery({
    queryKey: ["today-article", today],
    queryFn: fetchTodayArticle,
  });
};
