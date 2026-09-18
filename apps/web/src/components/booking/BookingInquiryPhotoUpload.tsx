"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { createPublicBookingInquiryUploadIntent, finalizePublicBookingInquiryUpload } from "@/src/lib/api";
import { getSupabaseBrowserClient } from "@/src/lib/supabase";

type Photo = { id: string; url: string; name: string; status: "uploading" | "ready" | "failed"; file: File };
type Props = { sessionId: string | null; disabled?: boolean; onChange: (ids: string[]) => void; onBusyChange?: (busy: boolean) => void };
const MAX = 5;

export function BookingInquiryPhotoUpload({ sessionId, disabled, onChange, onBusyChange }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const update = (next: Photo[]) => { setPhotos(next); onChange(next.filter((photo) => photo.status === "ready").map((photo) => photo.id)); onBusyChange?.(next.some((photo) => photo.status === "uploading")); };
  async function addFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).slice(0, MAX - photos.length);
    event.target.value = "";
    for (const file of files) {
      if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size > 5 * 1024 * 1024 || !sessionId) continue;
      const localId = crypto.randomUUID();
      const entry: Photo = { id: localId, url: URL.createObjectURL(file), name: file.name, status: "uploading", file };
      update([...photos, entry]);
      try {
        const display = await resize(file, 1600);
        const thumb = await resize(file, 400);
        const intent = await createPublicBookingInquiryUploadIntent({ inquiry_session_id: sessionId, original_filename: file.name || null, content_type: display.type, input_size_bytes: display.blob.size, display_content_type: display.type, thumbnail_content_type: thumb.type });
        const storage = getSupabaseBrowserClient().storage.from("appointment-images");
        const [displayUpload, thumbUpload] = await Promise.all([
          storage.uploadToSignedUrl(intent.signed_upload_urls.display.path, intent.signed_upload_urls.display.token, display.blob, { contentType: display.type, upsert: true }),
          storage.uploadToSignedUrl(intent.signed_upload_urls.thumbnail.path, intent.signed_upload_urls.thumbnail.token, thumb.blob, { contentType: thumb.type, upsert: true }),
        ]);
        if (displayUpload.error || thumbUpload.error) throw new Error("Upload failed");
        await finalizePublicBookingInquiryUpload({ inquiry_session_id: sessionId, upload_id: intent.id, storage_path: intent.storage_path, thumbnail_path: intent.thumbnail_path, original_filename: file.name || null, content_type: display.type, file_size_bytes: display.blob.size, thumbnail_size_bytes: thumb.blob.size, width: display.width, height: display.height, thumbnail_width: thumb.width, thumbnail_height: thumb.height });
        update(photos.map((photo) => photo.id === localId ? { ...photo, id: intent.id, status: "ready" } : photo));
      } catch {
        update(photos.map((photo) => photo.id === localId ? { ...photo, status: "failed" } : photo));
      }
    }
  }
  function remove(id: string) { const item = photos.find((photo) => photo.id === id); if (item) URL.revokeObjectURL(item.url); update(photos.filter((photo) => photo.id !== id)); }
  const pending = photos.some((photo) => photo.status === "uploading");
  return <div className="mt-2"><input ref={input} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => void addFiles(event)} />
    <button type="button" disabled={disabled || !sessionId || photos.length >= MAX || pending} onClick={() => input.current?.click()} className="flex min-h-24 w-full items-center justify-center rounded-xl border border-dashed border-brand/40 bg-brand-soft/30 px-4 text-sm font-semibold text-brand disabled:opacity-60">{pending ? "Uploading photos…" : "Add photos"}</button>
    <p className="mt-2 text-xs text-muted">JPG, PNG, or WebP. Up to 5 photos.</p>
    {photos.length ? <ul className="mt-3 grid grid-cols-5 gap-2">{photos.map((photo) => <li key={photo.id} className="relative"><img src={photo.url} alt={photo.name} className="h-14 w-full rounded-lg object-cover" /><button type="button" onClick={() => remove(photo.id)} aria-label={`Remove ${photo.name}`} className="absolute -right-1 -top-1 rounded-full bg-white px-1 text-xs shadow">×</button>{photo.status === "failed" ? <span className="block text-[10px] text-red-600">Retry</span> : null}</li>)}</ul> : null}</div>;
}

async function resize(file: File, max: number) {
  const image = await createImageBitmap(file); const scale = Math.min(1, max / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale)); const height = Math.max(1, Math.round(image.height * scale));
  const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height; const context = canvas.getContext("2d");
  if (!context) throw new Error("Unable to prepare image"); context.drawImage(image, 0, 0, width, height); image.close();
  const type = file.type === "image/png" || file.type === "image/webp" ? file.type : "image/jpeg" as const;
  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error("Unable to prepare image")), type, 0.82));
  if (blob.size > 2 * 1024 * 1024) throw new Error("Image is too large"); return { blob, type: type as "image/jpeg" | "image/png" | "image/webp", width, height };
}
