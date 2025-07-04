"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useMobile } from '@/hooks/use-mobile';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  type: 'create' | 'delete' | 'view';
  onSubmit: (data: { text?: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  onCancel?: () => void;
  loading?: boolean;
}

export default function AuthDialog({
  open,
  onOpenChange,
  title,
  description,
  type,
  onSubmit,
  onCancel,
  loading = false
}: AuthDialogProps) {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 500));

    const result = await onSubmit({ 
      text: type === 'create' ? text : undefined, 
      password 
    });
    
    if (result.success) {
      setText('');
      setPassword('');
      setError('');
      onOpenChange(false);
    } else {
      setError(result.error || 'Erro desconhecido');
      setPassword('');
    }

    setIsSubmitting(false);
  };

  const handleCancel = () => {
    setText('');
    setPassword('');
    setError('');
    onCancel?.();
    onOpenChange(false);
  };

  const handleOpen = () => {
    onOpenChange(true);
    if (isMobile) {
      setTimeout(() => {
        const firstInput = document.getElementById(type === 'create' ? 'dialog-text' : 'dialog-password') as HTMLInputElement | HTMLTextAreaElement;
        if (firstInput) {
          firstInput.focus();
        }
      }, 300);
    }
  };

  const isFormValid = () => {
    if (type === 'create') {
      return text.trim() && password.trim();
    }
    return password.trim();
  };

  const getSubmitButtonText = () => {
    if (isSubmitting) {
      switch (type) {
        case 'create': return 'Criando...';
        case 'delete': return 'Excluindo...';
        case 'view': return 'Verificando...';
        default: return 'Processando...';
      }
    }
    
    switch (type) {
      case 'create': return 'Criar';
      case 'delete': return 'Excluir';
      case 'view': return 'Visualizar';
      default: return 'Confirmar';
    }
  };

  const getSubmitButtonVariant = () => {
    switch (type) {
      case 'delete': return 'destructive' as const;
      default: return 'default' as const;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={`w-[95vw] max-w-lg px-4 ${isMobile ? "max-h-[80vh] overflow-y-auto" : ""}`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === 'create' && (
              <div className="space-y-2">
                <label htmlFor="dialog-text" className="text-sm font-medium">
                  Texto da nota
                </label>
                <Textarea
                  id="dialog-text"
                  placeholder="Digite sua nota..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  disabled={loading || isSubmitting}
                  required
                  autoFocus={!isMobile}
                  className="min-h-[100px] resize-none"
                />
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="dialog-password" className="text-sm font-medium">
                Digite a senha para confirmar
              </label>
              <Input
                id="dialog-password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || isSubmitting}
                required
                autoFocus={!isMobile && type !== 'create'}
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex gap-2 justify-end">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
                disabled={loading || isSubmitting}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                variant={getSubmitButtonVariant()}
                disabled={loading || isSubmitting || !isFormValid()}
              >
                {getSubmitButtonText()}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}