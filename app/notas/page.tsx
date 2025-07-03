import { createClient } from '@/lib/supabaseClient';
import NoteCard from '@/components/NoteCard';
import CreateNoteButton from '@/components/CreateNoteButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Note {
  id: number;
  text: string;
  created_at: string;
}

export default async function Notes() {
  const supabase = await createClient();
  const { data: notes } = await supabase.from("notes").select();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notas</CardTitle>
        </CardHeader>
        <CardContent>
          {!notes || notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <p className="text-muted-foreground">Nenhuma nota encontrada.</p>
              <CreateNoteButton />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {notes.map((note: Note) => (
                <NoteCard key={note.id} note={note} />
              ))}
              <CreateNoteButton />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}