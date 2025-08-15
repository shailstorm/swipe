import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://vzyyixtzcxqbvazybccy.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6eXlpeHR6Y3hxYnZhenliY2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyMDE0OTksImV4cCI6MjA3MDc3NzQ5OX0.jllvNyiUnfs_1OLX4tAUlcA8IFZ0NqsWB37_P64K8mk"
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})