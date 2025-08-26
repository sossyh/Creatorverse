import { createClient } from '@supabase/supabase-js'

const URL = 'https://wyxdyqphvzvyiobyxkzd.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5eGR5cXBodnp2eWlvYnl4a3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNTgwMjksImV4cCI6MjA3MTYzNDAyOX0.TLygGKGIerA6u_aZS7RjeSfenPyYGV5JHeqqtZr2RxE'

export const supabase = createClient(URL, API_KEY)
