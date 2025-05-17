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
    <div
      onClick={() => openModal(src)}
      className={`cursor-pointer rounded-xl overflow-hidden shadow-md border hover:ring-2 ring-blue-400 transition ${className}`}
    >
      <img src={src} alt={alt} className="w-full object-cover" />
    </div>
  );
}
