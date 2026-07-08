import { supabase } from "@/lib/supabase/client"

export async function getProjects() {
  return supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
}