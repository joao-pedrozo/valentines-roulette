"use client"

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function CreateNoteForm() {
  const [newNoteText, setNewNoteText] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [pendingNote, setPendingNote] = useState('');

  const ADMIN_PASSWORD = "valentine2024";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newNoteText.trim()) return;
    
    // Guarda a nota e abre o diálogo de senha
    setPendingNote(newNoteText.trim());
    setShowPasswordDialog(true);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError('');

    // Simula um pequeno delay para melhor UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (password === ADMIN_PASSWORD) {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        
        const { error } = await supabase.from("notes").insert([
          { text: pendingNote }
        ]);
        
        if (error) {
          console.error('Erro ao criar nota:', error);
          setPasswordError('Erro ao salvar a nota. Tente novamente.');
          return;
        }
        
        // Sucesso - limpa tudo e recarrega
        setNewNoteText('');
        setPendingNote('');
        setPassword('');
        setShowPasswordDialog(false);
        window.location.reload();
      } catch (error) {
        console.error('Erro ao criar nota:', error);
        setPasswordError('Erro ao salvar a nota. Tente novamente.');
      }
    } else {
      setPasswordError('Senha incorreta. Tente novamente.');
      setPassword('');
    }

    setLoading(false);
  };

  const handleCancel = () => {
    setShowPasswordDialog(false);
    setPassword('');
    setPasswordError('');
    setPendingNote('');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Criar Nova Nota</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2">
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

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmação de Senha</DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Digite a senha para confirmar
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                autoFocus
              />
            </div>
            
            {passwordError && (
              <Alert variant="destructive">
                <AlertDescription>{passwordError}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex gap-2 justify-end">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={loading || !password.trim()}
              >
                {loading ? 'Confirmando...' : 'Confirmar'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
} 