"use client"

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { deleteNote } from '@/app/actions';

interface Note {
  id: number;
  text: string;
  created_at: string;
}

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const createdDate = new Date(note.created_at);
  const timeAgo = getTimeAgo(createdDate);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError('');

    // Simula um pequeno delay para melhor UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = await deleteNote(note.id, password);
    
    if (result.success) {
      // Sucesso - limpa tudo e fecha o diálogo
      setPassword('');
      setShowDeleteDialog(false);
      // A página será revalidada automaticamente pelo Server Action
    } else {
      setPasswordError(result.error || 'Erro desconhecido');
      setPassword('');
    }

    setLoading(false);
  };

  const handleCancel = () => {
    setShowDeleteDialog(false);
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
          min-h-[120px] flex flex-col justify-between
          relative overflow-hidden
        "
      >
        {/* Pin effect */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
          <div className="w-3 h-3 bg-muted-foreground/30 rounded-full shadow-sm"></div>
        </div>

        {/* Delete button */}
        <div className="absolute top-2 right-2 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteDialog(true);
            }}
            className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
        
        {/* Note content */}
        <div className="mt-4 flex-1">
          <p className="text-card-foreground font-medium leading-relaxed break-words">
            {note.text}
          </p>
        </div>
        
        {/* Footer with metadata */}
        <div className="mt-3 pt-2 border-t border-border/50">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span className="font-medium">#{note.id}</span>
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Tem certeza que deseja excluir esta nota? Esta ação não pode ser desfeita.
            </p>
            <form onSubmit={handleDelete} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="delete-password" className="text-sm font-medium">
                  Digite a senha para confirmar
                </label>
                <Input
                  id="delete-password"
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
                  variant="destructive"
                  disabled={loading || !password.trim()}
                >
                  {loading ? 'Excluindo...' : 'Excluir'}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Função para calcular tempo relativo
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'agora mesmo';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m atrás`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h atrás`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d atrás`;
  }
} 