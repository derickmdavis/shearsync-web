import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PublicReferencePhotoUpload } from "@/src/components/booking/PublicReferencePhotoUpload";
import * as bookingApi from "@/src/lib/api";

const mocks = vi.hoisted(() => ({
  createUploadIntent: vi.fn(),
  finalizeReferencePhoto: vi.fn(),
  uploadToSignedUrl: vi.fn(),
}));

vi.mock("@/src/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/src/lib/api")>(
    "@/src/lib/api",
  );

  return {
    ...actual,
    createPublicReferencePhotoUploadIntent: mocks.createUploadIntent,
    finalizePublicReferencePhoto: mocks.finalizeReferencePhoto,
  };
});

vi.mock("@/src/lib/supabase", () => ({
  getSupabaseBrowserClient: () => ({
    storage: {
      from: () => ({ uploadToSignedUrl: mocks.uploadToSignedUrl }),
    },
  }),
}));

describe("PublicReferencePhotoUpload", () => {
  const originalCreateObjectUrl = URL.createObjectURL;
  const originalRevokeObjectUrl = URL.revokeObjectURL;

  beforeEach(() => {
    vi.clearAllMocks();
    URL.createObjectURL = vi.fn(() => "blob:reference-photo");
    URL.revokeObjectURL = vi.fn();
    vi.stubGlobal(
      "createImageBitmap",
      vi.fn(async () => ({
        width: 1200,
        height: 800,
        close: vi.fn(),
      })),
    );
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
      fillStyle: "",
      fillRect: vi.fn(),
      drawImage: vi.fn(),
    } as unknown as CanvasRenderingContext2D);
    vi.spyOn(HTMLCanvasElement.prototype, "toBlob").mockImplementation(
      function (callback, type) {
        const size = this.width === 400 ? 100 : 200;
        callback(new Blob([new Uint8Array(size)], { type: type ?? "image/jpeg" }));
      },
    );

    mocks.createUploadIntent.mockResolvedValue({
      id: "11111111-1111-4111-8111-111111111111",
      storage_path: "appointments/display.jpg",
      thumbnail_path: "appointments/thumbnail.jpg",
      image_source: "client",
      image_role: "reference",
      signed_upload_urls: {
        display: {
          signedUrl: "https://storage.example/display",
          token: "display-token",
          path: "appointments/display.jpg",
        },
        thumbnail: {
          signedUrl: "https://storage.example/thumbnail",
          token: "thumbnail-token",
          path: "appointments/thumbnail.jpg",
        },
      },
      max_constraints: {
        max_reference_images: 1,
        max_file_size_bytes: 2 * 1024 * 1024,
        upload_expires_in_minutes: 15,
      },
    });
    mocks.uploadToSignedUrl.mockResolvedValue({ data: {}, error: null });
    mocks.finalizeReferencePhoto.mockResolvedValue({
      id: "11111111-1111-4111-8111-111111111111",
    });
  });

  afterEach(() => {
    cleanup();
    URL.createObjectURL = originalCreateObjectUrl;
    URL.revokeObjectURL = originalRevokeObjectUrl;
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("finalizes a backend-compatible display image and 400px thumbnail", async () => {
    const { container } = render(
      <PublicReferencePhotoUpload
        referenceToken="reference-token"
        tokenExpiresAt="2099-06-15T09:00:00-06:00"
      />,
    );
    const input = container.querySelector<HTMLInputElement>('input[type="file"]');
    const photo = new File([new Uint8Array(1024)], "inspiration.jpg", {
      type: "image/jpeg",
    });

    fireEvent.change(input!, { target: { files: [photo] } });

    expect(await screen.findByText("Reference photo added")).toBeTruthy();
    await waitFor(() => {
      expect(bookingApi.finalizePublicReferencePhoto).toHaveBeenCalledWith({
        reference_photo_upload_token: "reference-token",
        image_id: "11111111-1111-4111-8111-111111111111",
        storage_path: "appointments/display.jpg",
        thumbnail_path: "appointments/thumbnail.jpg",
        original_filename: "inspiration.jpg",
        content_type: "image/jpeg",
        file_size_bytes: 200,
        thumbnail_size_bytes: 100,
        width: 1200,
        height: 800,
        thumbnail_width: 400,
        thumbnail_height: 267,
        caption: null,
      });
    });
  });
});
