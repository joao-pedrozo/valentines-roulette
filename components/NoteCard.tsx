interface Note {
  id: number;
  text: string;
  created_at: string;
}

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const createdDate = new Date(note.created_at);
  const timeAgo = getTimeAgo(createdDate);
  
  return (
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