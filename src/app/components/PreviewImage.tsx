"use client";
import { useModalImage } from "./ModalImageViewer";

export default function PreviewImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const openModal = useModalImage();

  return (
    <div>
      <div
        onClick={() => openModal(src)}
        className={`cursor-pointer rounded-xl overflow-hidden shadow-md border hover:ring-2 ring-blue-400 transition ${className}`}
      >
        <img src={src} alt={alt} className="w-full object-cover" />
      </div>
      <p className="text-sm text-gray-500 italic text-center mt-2">
        This is an early version of Innernet.
      </p>
    </div>
  );
}
