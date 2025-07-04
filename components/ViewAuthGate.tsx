"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, Lock } from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';

interface ViewAuthGateProps {
  children: React.ReactNode;
  correctPassword: string;
}

export default function ViewAuthGate({ children, correctPassword }: ViewAuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionExpiry, setSessionExpiry] = useState<number | null>(null);
  const isMobile = useMobile();

  // Verificar sessão ao carregar
  useEffect(() => {
    const savedSession = localStorage.getItem('notes_view_session');
    if (savedSession) {
      const expiry = parseInt(savedSession);
      const now = Date.now();
      
      if (now < expiry) {
        setIsAuthenticated(true);
        setSessionExpiry(expiry);
      } else {
        localStorage.removeItem('notes_view_session');
      }
    }
  }, []);

  // Verificar expiração da sessão
  useEffect(() => {
    if (sessionExpiry) {
      const interval = setInterval(() => {
        const now = Date.now();
        if (now >= sessionExpiry) {
          setIsAuthenticated(false);
          setSessionExpiry(null);
          localStorage.removeItem('notes_view_session');
        }
      }, 1000); // Verificar a cada segundo

      return () => clearInterval(interval);
    }
  }, [sessionExpiry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simula um pequeno delay para melhor UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (password === correctPassword) {
      // Criar sessão de 30 minutos
      const expiry = Date.now() + (30 * 60 * 1000); // 30 minutos
      localStorage.setItem('notes_view_session', expiry.toString());
      
      setIsAuthenticated(true);
      setSessionExpiry(expiry);
      setPassword('');
    } else {
      setError('Senha incorreta. Tente novamente.');
      setPassword('');
    }

    setLoading(false);
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Eye className="w-6 h-6 text-primary" />
        </div>
        <CardTitle>Visualizar Notas</CardTitle>
        <div className='block pt-1 pb-0'>
        <span className='text-sm text-muted-foreground'>
          Se não souber, pergunte para o seu hómi 🍭🤭
        </span>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="view-password" className="text-sm font-medium">
              Senha para visualizar
            </label>
            <Input
              id="view-password"
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              autoFocus={!isMobile}
            />
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !password.trim()}
          >
            {loading ? 'Verificando...' : 'Visualizar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 