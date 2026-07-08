import { supabase } from "@/lib/supabase/client"

export const signIn = (email: string, password: string) =>
  supabase.auth.signInWithPassword({
    email,
    password,
  })

export const signOut = () =>
  supabase.auth.signOut()

export const getUser = () =>
  supabase.auth.getUser()