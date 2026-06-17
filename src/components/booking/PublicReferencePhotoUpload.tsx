"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ChangeEvent,
} from "react";
import {
  ApiError,
  createPublicReferencePhotoUploadIntent,
  finalizePublicReferencePhoto,
  type PublicReferencePhotoContentType,
} from "@/src/lib/api";
import { getSupabaseBrowserClient } from "@/src/lib/supabase";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
const APPOINTMENT_IMAGE_BUCKET = "appointment-images";
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_TIMEOUT_MS = 2_147_483_647;

type AcceptedImageType = (typeof ACCEPTED_IMAGE_TYPES)[number];

type ProcessedImage = {
  blob: Blob;
  contentType: PublicReferencePhotoContentType;
  sizeBytes: number;
  width: number;
  height: number;
};

type UploadState =
  | { status: "idle" }
  | { status: "processing" }
  | { status: "uploading"; progress: number }
  | { status: "success"; imageId: string }
  | { status: "failed"; message: string; canRetry: boolean };

type PublicReferencePhotoUploadProps = {
  referenceToken?: string | null;
  tokenExpiresAt?: string | null;
  initialFile?: File | null;
  onInitialFileConsumed?: () => void;
};

export function PublicReferencePhotoUpload({
  referenceToken,
  tokenExpiresAt,
  initialFile,
  onInitialFileConsumed,
}: PublicReferencePhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const autoUploadStartedRef = useRef(false);
  const [state, setState] = useState<UploadState>({ status: "idle" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const canUpload = useTokenIsActive(referenceToken, tokenExpiresAt);

  const setPreview = useCallback((nextUrl: string | null) => {
    setPreviewUrl((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }

      return nextUrl;
    });
  }, []);

  const uploadReferencePhoto = useCallback(
    async (file: File) => {
      if (!referenceToken) {
        return;
      }

      try {
        setState({ status: "processing" });

        const [display, thumbnail] = await Promise.all([
          resizeImage(file, { maxLongEdge: 1600 }),
          resizeImage(file, { maxLongEdge: 520 }),
        ]);

        setState({ status: "uploading", progress: 20 });

        const intent = await createPublicReferencePhotoUploadIntent({
          reference_photo_upload_token: referenceToken,
          original_filename: file.name || null,
          content_type: display.contentType,
          input_size_bytes: display.sizeBytes,
          display_content_type: display.contentType,
          thumbnail_content_type: thumbnail.contentType,
        });

        setState({ status: "uploading", progress: 45 });

        const supabase = getSupabaseBrowserClient();
        const displayUpload = await supabase.storage
          .from(APPOINTMENT_IMAGE_BUCKET)
          .uploadToSignedUrl(
            intent.signed_upload_urls.display.path,
            intent.signed_upload_urls.display.token,
            display.blob,
            {
              contentType: display.contentType,
              upsert: true,
            },
          );

        if (displayUpload.error) {
          throw displayUpload.error;
        }

        setState({ status: "uploading", progress: 70 });

        const thumbnailUpload = await supabase.storage
          .from(APPOINTMENT_IMAGE_BUCKET)
          .uploadToSignedUrl(
            intent.signed_upload_urls.thumbnail.path,
            intent.signed_upload_urls.thumbnail.token,
            thumbnail.blob,
            {
              contentType: thumbnail.contentType,
              upsert: true,
            },
          );

        if (thumbnailUpload.error) {
          throw thumbnailUpload.error;
        }

        setState({ status: "uploading", progress: 90 });

        const finalized = await finalizePublicReferencePhoto({
          reference_photo_upload_token: referenceToken,
          image_id: intent.id,
          storage_path: intent.storage_path,
          thumbnail_path: intent.thumbnail_path,
          original_filename: file.name || null,
          content_type: display.contentType,
          file_size_bytes: display.sizeBytes,
          thumbnail_size_bytes: thumbnail.sizeBytes,
          width: display.width,
          height: display.height,
          caption: null,
        });

        setState({ status: "success", imageId: finalized.id ?? intent.id });
      } catch (error) {
        setState({
          status: "failed",
          message: getUploadErrorMessage(error),
          canRetry: true,
        });
      }
    },
    [referenceToken],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!canUpload || !initialFile || autoUploadStartedRef.current) {
      return;
    }

    autoUploadStartedRef.current = true;
    setSelectedFile(initialFile);
    setPreview(URL.createObjectURL(initialFile));
    onInitialFileConsumed?.();
    void uploadReferencePhoto(initialFile);
  }, [
    canUpload,
    initialFile,
    onInitialFileConsumed,
    setPreview,
    uploadReferencePhoto,
  ]);

  if (!canUpload) {
    return null;
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!isAcceptedImageType(file.type)) {
      setState({
        status: "failed",
        message: "We couldn't upload that photo. Please try another image.",
        canRetry: false,
      });
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    await uploadReferencePhoto(file);
  }

  function handleRetry() {
    if (selectedFile && state.status === "failed" && state.canRetry) {
      void uploadReferencePhoto(selectedFile);
    }
  }

  function handleRemove() {
    setSelectedFile(null);
    setPreview(null);
    setState({ status: "idle" });
  }

  const busy = state.status === "processing" || state.status === "uploading";
  const uploadDisabled = busy || state.status === "success";

  return (
    <section className="mt-8 text-left">
      <div>
        <h3 className="text-sm font-semibold text-foreground">
          Add an inspiration/reference photo
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted">
          This photo is private and shared only with your stylist for this
          appointment.
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(event) => void handleFileChange(event)}
      />

      {state.status === "success" ? (
        <div className="mt-4 rounded-2xl border border-success/30 bg-success/10 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-success text-white">
              <CheckIcon />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Reference photo added
              </p>
              <p className="mt-1 text-xs text-muted">
                Your stylist will see it with this appointment.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <button
            type="button"
            disabled={uploadDisabled}
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 flex min-h-24 w-full items-center justify-between gap-4 rounded-2xl border border-dashed border-brand/40 bg-white px-4 py-4 text-left transition hover:border-brand hover:bg-brand/5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/30 text-brand">
                <ImageIcon />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  {busy ? "Uploading reference photo" : "Add a reference photo"}
                </span>
                <span className="mt-1 block text-xs text-muted">
                  JPG, PNG, or WebP up to 5 MB
                </span>
              </span>
            </span>
            <span className="shrink-0 rounded-full border border-brand/50 px-4 py-2 text-xs font-semibold text-brand">
              Choose Photo
            </span>
          </button>

          {busy ? (
            <div className="mt-3">
              <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full bg-brand transition-all"
                  style={{
                    width:
                      state.status === "uploading"
                        ? `${state.progress}%`
                        : "12%",
                  }}
                />
              </div>
              <p className="mt-2 text-xs font-medium text-muted">
                {state.status === "processing"
                  ? "Preparing your photo..."
                  : "Uploading securely..."}
              </p>
            </div>
          ) : null}

          {selectedFile && state.status === "failed" ? (
            <div className="mt-4 rounded-2xl border border-border bg-white p-4">
              <div className="flex gap-3">
                {previewUrl ? (
                  <span
                    aria-hidden="true"
                    className="h-16 w-16 shrink-0 rounded-xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${previewUrl})` }}
                  />
                ) : null}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {selectedFile.name}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    {state.message}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {state.canRetry ? (
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="text-xs font-semibold text-brand hover:text-brand-dark"
                      >
                        Retry
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={handleRemove}
                      className="text-xs font-semibold text-muted hover:text-foreground"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}

function useTokenIsActive(
  referenceToken?: string | null,
  tokenExpiresAt?: string | null,
) {
  const subscribe = useCallback(
    (notify: () => void) => {
      if (!referenceToken || !tokenExpiresAt) {
        return () => {};
      }

      const expiryTime = new Date(tokenExpiresAt).getTime();
      const millisecondsUntilExpiry = expiryTime - Date.now();

      if (!Number.isFinite(expiryTime) || millisecondsUntilExpiry <= 0) {
        window.setTimeout(notify, 0);
        return () => {};
      }

      let timeoutId: number | null = null;

      const schedule = () => {
        const remaining = expiryTime - Date.now();

        if (remaining <= 0) {
          notify();
          return;
        }

        timeoutId = window.setTimeout(() => {
          notify();
          schedule();
        }, Math.min(remaining, MAX_TIMEOUT_MS));
      };

      schedule();

      return () => {
        if (timeoutId !== null) {
          window.clearTimeout(timeoutId);
        }
      };
    },
    [referenceToken, tokenExpiresAt],
  );

  const getSnapshot = useCallback(() => {
    if (!referenceToken || !tokenExpiresAt) {
      return false;
    }

    const expiryTime = new Date(tokenExpiresAt).getTime();

    return Number.isFinite(expiryTime) && expiryTime > Date.now();
  }, [referenceToken, tokenExpiresAt]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

function isAcceptedImageType(value: string): value is AcceptedImageType {
  return ACCEPTED_IMAGE_TYPES.some((contentType) => contentType === value);
}

async function resizeImage(
  file: File,
  { maxLongEdge }: { maxLongEdge: number },
): Promise<ProcessedImage> {
  const source = await loadImageSource(file);
  const scale = Math.min(1, maxLongEdge / Math.max(source.width, source.height));
  const width = Math.max(1, Math.round(source.width * scale));
  const height = Math.max(1, Math.round(source.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    cleanupImageSource(source.image);
    throw new Error("Unable to prepare this image.");
  }

  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, width, height);
  context.drawImage(source.image, 0, 0, width, height);
  cleanupImageSource(source.image);

  const contentType = getOutputContentType(file.type);
  const blob = await canvasToBoundedBlob(canvas, contentType);

  return {
    blob,
    contentType,
    sizeBytes: blob.size,
    width,
    height,
  };
}

async function loadImageSource(file: File) {
  if ("createImageBitmap" in window) {
    const image = await createImageBitmap(file);

    return {
      image,
      width: image.width,
      height: image.height,
    };
  }

  const url = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Unable to read this image."));
      img.src = url;
    });

    return {
      image,
      width: image.naturalWidth,
      height: image.naturalHeight,
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}

function cleanupImageSource(image: CanvasImageSource) {
  if ("close" in image && typeof image.close === "function") {
    image.close();
  }
}

function getOutputContentType(value: string): PublicReferencePhotoContentType {
  return value === "image/webp" ? "image/webp" : "image/jpeg";
}

async function canvasToBoundedBlob(
  canvas: HTMLCanvasElement,
  contentType: PublicReferencePhotoContentType,
) {
  const qualities = contentType === "image/jpeg" ? [0.86, 0.74, 0.62, 0.5] : [0.82, 0.7, 0.58];

  for (const quality of qualities) {
    const blob = await canvasToBlob(canvas, contentType, quality);

    if (blob.size <= MAX_FILE_SIZE_BYTES) {
      return blob;
    }
  }

  throw new Error("We couldn't upload that photo. Please try another image.");
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  contentType: PublicReferencePhotoContentType,
  quality: number,
) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
          return;
        }

        reject(new Error("Unable to prepare this image."));
      },
      contentType,
      quality,
    );
  });
}

function getUploadErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 409) {
      return "A reference photo has already been added for this appointment.";
    }

    if (error.status === 400) {
      return "We couldn't upload that photo. Please try another image.";
    }

    if (error.status === 410) {
      return "Upload expired. Please try again.";
    }
  }

  if (error instanceof Error && error.message) {
    if (error.message.includes("couldn't upload")) {
      return error.message;
    }
  }

  return "Upload failed. Please try again.";
}

function ImageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <rect
        x="3.5"
        y="4.5"
        width="17"
        height="15"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m6.5 16 3.2-3.4 2.4 2.3 2.6-3.1L18 16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="9" cy="9" r="1.25" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M5.5 12.5 10 17l8.5-9"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}
