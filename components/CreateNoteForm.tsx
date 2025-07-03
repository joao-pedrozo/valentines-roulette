"use client"

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreateNoteForm() {
  const [newNoteText, setNewNoteText] = useState('');
  const [loading, setLoading] = useState(false);

  const createNote = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newNoteText.trim()) return;
    
    setLoading(true);
    
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      const { error } = await supabase.from("notes").insert([
        { text: newNoteText.trim() }
      ]);
      
      if (error) {
        console.error('Erro ao criar nota:', error);
        return;
      }
      
      setNewNoteText('');
      // Recarrega a página para mostrar a nova nota
      window.location.reload();
    } catch (error) {
      console.error('Erro ao criar nota:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Nova Nota</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={createNote} className="flex gap-2">
          <Input
            type="text"
            placeholder="Digite sua nota..."
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            className="flex-1"
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !newNoteText.trim()}>
            {loading ? 'Criando...' : 'Criar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 