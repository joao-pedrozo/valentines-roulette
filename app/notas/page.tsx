import { createClient } from '@/lib/supabaseClient';

export default async function Notes() {
  const supabase = await createClient();

  const data = await supabase.from("notes").select();

  console.log(data);

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}