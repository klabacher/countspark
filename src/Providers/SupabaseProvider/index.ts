// TODO: add import { MergeDeep } from 'type-fest'; for better handling/typing of nested objects/jsonb fields pgjson_schema on supabase as extension

import { createClient } from '@supabase/supabase-js'
import { Database } from 'Types/SupabaseTypes'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Key is not defined in .env.local')
}

// Criamos o cliente Tipado! Isso é o teu ORM.
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase
export const supabaseAuth = supabase.auth
