import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cxfpfizkkktfngagqvxr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnBmaXpra2t0Zm5nYWdxdnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzODM2MzYsImV4cCI6MjA2NTk1OTYzNn0.vKYnT2I0DTy14-MsgWxz1S7CSrrr4SaQArwuBau1tv0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
