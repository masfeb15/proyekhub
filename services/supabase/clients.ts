import { createClient } from "@/lib/supabase/client"

export async function getClients() {
  return supabase
    .from("clients")
    .select("*")
    .order("client_name")
}