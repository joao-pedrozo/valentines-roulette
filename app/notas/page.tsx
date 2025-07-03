import { createClient } from '@/lib/supabaseClient';
import CreateNoteForm from '@/components/CreateNoteForm';
import NoteCard from '@/components/NoteCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Notes() {
  const supabase = await createClient();
  const { data: notes } = await supabase.from("notes").select();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <CreateNoteForm />
      
      <Card>
        <CardHeader>
          <CardTitle>Notas Existentes</CardTitle>
        </CardHeader>
        <CardContent>
          {!notes || notes.length === 0 ? (
            <p className="text-muted-foreground">Nenhuma nota encontrada.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {notes.map((note: any) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}