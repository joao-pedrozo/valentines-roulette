import { createClient } from '@/lib/supabaseClient';
import CreateNoteForm from '@/components/CreateNoteForm';
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
            <div className="space-y-4">
              {notes.map((note: any) => (
                <div key={note.id} className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    ID: {note.id} | Criado em: {new Date(note.created_at).toLocaleString()}
                  </p>
                  <p className="mt-2">{note.text}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}