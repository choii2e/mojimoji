import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

const fetchTodayArticle = async () => {
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("articles")
    .select(`*, vocabularies(*), grammar_points(*)`)
    .eq("published_date", today)
    .single();

  if (error) throw error;
  return data;
};

export const useTodayArticle = () => {
  return useQuery({
    queryKey: ["today-article"],
    queryFn: fetchTodayArticle,
  });
};
