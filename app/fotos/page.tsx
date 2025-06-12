import { PhotoGrid } from "@/components/photo-grid"

export default function PhotosPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-red-600 dark:text-red-400 mb-8 flex items-center justify-center gap-2">
        Nossas Memórias
      </h1>
      <PhotoGrid />
    </main>
  )
}
