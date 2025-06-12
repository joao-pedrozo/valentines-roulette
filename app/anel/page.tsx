"use client";
import { WeddingRingShowcase } from "@/components/WeddingRingShowcase";

export default function AnelPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#fceabb] to-[#e8cbc0] dark:from-[#181818] dark:via-[#232526] dark:to-[#414345] p-4">
      <div className="max-w-lg w-full flex flex-col items-center justify-center bg-white/80 dark:bg-[#181818]/80 rounded-2xl shadow-2xl p-8 border border-pink-200 dark:border-[#232526]">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-pink-600 dark:text-yellow-300 mb-2 drop-shadow">Aliança Eterna</h1>
        <p className="text-center text-gray-700 dark:text-gray-200 mb-6 text-lg">
          Um símbolo do nosso compromisso, amor e união. Assim como este anel, nossa história não tem começo nem fim — é um ciclo infinito de carinho, respeito e sonhos compartilhados.
        </p>
        <WeddingRingShowcase />
        <p className="mt-6 text-center text-pink-700 dark:text-yellow-200 italic text-base">
          "Que este anel nos lembre todos os dias do quanto somos especiais um para o outro."
        </p>
      </div>
    </main>
  );
} 