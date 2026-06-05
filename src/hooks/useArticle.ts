import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

const fetchArticle = async (id: string) => {
  const { data, error } = await supabase
    .from("articles")
    .select(`*, vocabularies(*), grammar_points(*)`)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const useArticle = (id: string) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id),
    enabled: !!id,
  });
};
