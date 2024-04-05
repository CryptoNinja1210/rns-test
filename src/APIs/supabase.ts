import { createClient, SupabaseClient } from "@supabase/supabase-js"

type GasDataType = {
  time: Date | string,
  slow: number,
  standard: number,
  fast: number,
}

const createSupabaseClient = (): SupabaseClient<any, "public", any> => createClient(
  'https://aazdhrljjulzzzuyfiad.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhemRocmxqanVsenp6dXlmaWFkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjI1OTU5NSwiZXhwIjoyMDI3ODM1NTk1fQ.JW50p3DXRlMOOh7w16u7Iw-zQ9ywWtIBeyjjklW80AE'
);

export async function SaveData(_props: GasDataType) {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("gasData")
    .insert(_props)
    .select();
  if (error) {
    console.error("Error saving data:", error);
    return error;
  } else {
    console.log("Data saved successfully:", data);
    return data;
  }
}

export async function GetAllData() {
  const supabase = createSupabaseClient();
  const { data, error, status } = await supabase
    .from("gasData")
    .select()
    .order("id", { ascending: true });
  if (status === 200) {
    return data;
  } else {
    console.error(error);
  }
  return [];
}
