"use client"

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { createNote } from '@/app/actions';
import AuthDialog from '@/components/ui/auth-dialog';

export default function CreateNoteButton() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleCreate = async ({ text, password }: { text?: string; password: string }) => {
    if (!text) {
      return { success: false, error: 'Texto da nota é obrigatório' };
    }
    return await createNote(text, password);
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

      <AuthDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        title="Criar Nova Nota"
        type="create"
        onSubmit={handleCreate}
      />
    </>
  );
} 