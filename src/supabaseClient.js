import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dxvojinorsxkeqqjxfid.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4dm9qaW5vcnN4a2VxcWp4ZmlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQyNTk2ODcsImV4cCI6MjAwOTgzNTY4N30.eyJhbGcZCJ9'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase