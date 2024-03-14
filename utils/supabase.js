import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://qunrtdxthkcyqfpoolox.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1bnJ0ZHh0aGtjeXFmcG9vbG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MDMzNDEsImV4cCI6MjAyNTk3OTM0MX0.vpJD9hZmX1RP5l1NDpw49pYUxoJ11WuaDEUG9DmmZZI"
);
