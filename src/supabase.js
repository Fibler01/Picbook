
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pghsxgvyagmzmgwzfpbh.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnaHN4Z3Z5YWdtem1nd3pmcGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg1OTY0ODEsImV4cCI6MTk5NDE3MjQ4MX0.b5LgdzEtXZKPznB_uiIwRyYaqLU5icmyl9MAKZsAJQg"
export const supabase = createClient(supabaseUrl, supabaseKey)