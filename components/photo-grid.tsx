"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"

// Placeholder para as fotos - substitua com suas próprias fotos depois
const placeholderPhotos = [
  {
    id: 1,
    src: "/gallery/imagem-1.png",
    alt: "",
    width: 368,
    height: 500,
  },
  {
    id: 2,
    src: "/gallery/imagem-5.jpg",
    alt: "",
    width: 368,
    height: 300,
  },
  {
    id: 3,
    src: "/gallery/imagem-4.png",
    alt: "",
    width: 368,
    height: 450,
  },
  {
    id: 4,
    src: "/gallery/imagem-2.png",
    alt: "",
    width: 368,
    height: 400,
  },
  {
    id: 5,
    src: "/gallery/imagem-7.jpg",
    alt: "",
    width: 368,
    height: 350,
  },
  {
    id: 6,
    src: "/gallery/imagem-3.png",
    alt: "",
    width: 368,
    height: 480,
  },
  {
    id: 7,
    src: "/gallery/imagem-6.jpg",
    alt: "",
    width: 368,
    height: 320,
  },
  {
    id: 8,
    src: "/gallery/imagem-8.jpg",
    alt: "",
    width: 368,
    height: 420,
  },
  {
    id: 9,
    src: "/gallery/imagem-9.jpg",
    alt: "",
    width: 368,
    height: 380,
  },
]

export function PhotoGrid() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [likedPhotos, setLikedPhotos] = useState<number[]>([])

  const handlePhotoClick = (id: number) => {
    setSelectedPhoto(id)
  }

  const handleCloseModal = () => {
    setSelectedPhoto(null)
  }

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (likedPhotos.includes(id)) {
      setLikedPhotos(likedPhotos.filter((photoId) => photoId !== id))
    } else {
      setLikedPhotos([...likedPhotos, id])
    }
  }

  return (
    <>
      <div className="max-w-[1152px] mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {placeholderPhotos.map((photo) => (
            <div
              key={photo.id}
              className="relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer break-inside-avoid mb-4"
              style={{ width: "100%", maxWidth: "368px" }}
              onClick={() => handlePhotoClick(photo.id)}
            >
              <div className="relative w-full" style={{ height: `${photo.height}px` }}>
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 368px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <p className="text-white text-sm font-medium">{photo.alt}</p>
                  <button
                    onClick={(e) => toggleLike(photo.id, e)}
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/20 backdrop-blur-sm"
                  >
                    <Heart
                      className={`h-5 w-5 ${likedPhotos.includes(photo.id) ? "fill-red-500 text-red-500" : "text-white"}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para visualização de foto */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={handleCloseModal}>
          <div
            className="relative max-w-4xl max-h-[90vh] w-full bg-white dark:bg-[#0f0f0f] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-black/40"
              onClick={handleCloseModal}
            >
              ✕
            </button>

            {placeholderPhotos.find((p) => p.id === selectedPhoto) && (
              <div className="relative w-full h-[80vh]">
                <Image
                  src={placeholderPhotos.find((p) => p.id === selectedPhoto)?.src || ""}
                  alt={placeholderPhotos.find((p) => p.id === selectedPhoto)?.alt || ""}
                  fill
                  className="object-contain"
                />
              </div>
            )}

            <div className="p-4 bg-white dark:bg-[#0f0f0f]">
              <p className="text-lg font-medium text-gray-900 dark:text-[#e0e0e0]">
                {placeholderPhotos.find((p) => p.id === selectedPhoto)?.alt}
              </p>
              {/* <p className="text-sm text-gray-500 dark:text-[#a0a0a0]">
                Uma memória especial para guardar no coração ❤️
              </p> */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
