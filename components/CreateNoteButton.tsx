"use client"

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { createNote } from '@/app/actions';

export default function CreateNoteButton() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newNoteText.trim()) return;
    
    setLoading(true);
    setPasswordError('');

    // Simula um pequeno delay para melhor UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = await createNote(newNoteText.trim(), password);
    
    if (result.success) {
      // Sucesso - limpa tudo e fecha o diálogo
      setNewNoteText('');
      setPassword('');
      setShowCreateDialog(false);
      // A página será revalidada automaticamente pelo Server Action
    } else {
      setPasswordError(result.error || 'Erro desconhecido');
      setPassword('');
    }

    setLoading(false);
  };

  const handleCancel = () => {
    setShowCreateDialog(false);
    setNewNoteText('');
    setPassword('');
    setPasswordError('');
  };

  return (
    <>
      <div
        className="
          bg-card border border-border rounded-lg p-4 
          transform rotate-1 hover:rotate-0 transition-all duration-200
          shadow-sm hover:shadow-md hover:scale-105
          min-h-[120px] flex flex-col justify-center items-center
          relative overflow-hidden cursor-pointer
          border-dashed border-2
        "
        onClick={() => setShowCreateDialog(true)}
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Plus className="w-4 h-4 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground font-medium">Nova Nota</p>
        </div>
      </div>

      {/* Create note dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Nova Nota</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="note-text" className="text-sm font-medium">
                Texto da nota
              </label>
              <Textarea
                id="note-text"
                placeholder="Digite sua nota..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                disabled={loading}
                required
                autoFocus
                className="min-h-[100px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="create-password" className="text-sm font-medium">
                Digite a senha para confirmar
              </label>
              <Input
                id="create-password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
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
                disabled={loading || !newNoteText.trim() || !password.trim()}
              >
                {loading ? 'Criando...' : 'Criar'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
} 