'use server'

import { createClient } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';

export async function deleteNote(noteId: number, password: string) {
  const ADMIN_PASSWORD = "valentine2024";
  
  if (password !== ADMIN_PASSWORD) {
    return { success: false, error: 'Senha incorreta' };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq('id', noteId);
    
    if (error) {
      console.error('Erro ao deletar nota:', error);
      return { success: false, error: 'Erro ao deletar a nota' };
    }
    
    // Revalida a página para mostrar as mudanças
    revalidatePath('/notas');
    
    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar nota:', error);
    return { success: false, error: 'Erro interno do servidor' };
  }
}

export async function createNote(text: string, password: string) {
  const ADMIN_PASSWORD = "valentine2024";
  
  if (password !== ADMIN_PASSWORD) {
    return { success: false, error: 'Senha incorreta' };
  }

  if (!text.trim()) {
    return { success: false, error: 'Texto da nota não pode estar vazio' };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("notes")
      .insert([{ text: text.trim() }]);
    
    if (error) {
      console.error('Erro ao criar nota:', error);
      return { success: false, error: 'Erro ao criar a nota' };
    }
    
    // Revalida a página para mostrar as mudanças
    revalidatePath('/notas');
    
    return { success: true };
  } catch (error) {
    console.error('Erro ao criar nota:', error);
    return { success: false, error: 'Erro interno do servidor' };
  }
} 