import { useQuery } from "@tanstack/react-query";
import { toDateString } from "../lib/date";
import { supabase } from "../lib/supabase";

const fetchArchive = async () => {
  const today = toDateString(new Date());

  const { data, error } = await supabase
    .from("articles")
    .select("id, published_date, title, category")
    .lt("published_date", today)
    .order("published_date", { ascending: false });

  if (error) throw error;
  return data;
};

export const useArchive = () => {
  return useQuery({
    queryKey: ["archive"],
    queryFn: fetchArchive,
  });
};
