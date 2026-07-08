import { supabase } from "@/lib/supabase/client"

export async function getContracts() {
  return supabase
    .from("project_contracts")
    .select("*")
}