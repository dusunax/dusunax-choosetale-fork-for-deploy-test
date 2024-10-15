"use server";
import { revalidateTag } from "next/cache";
import type { HttpError } from "@choosetale/nestia-type";
import api from "@/lib/axios/axios";
import type { ApiResponse, SuccessResponse } from "../action";

interface UploadThumbnail {
  id: number;
  url: string;
  gameId: number;
  createdAt: string;
  updatedAt: string;
}

interface UploadThumbnailSuccessResponse extends SuccessResponse {
  uploadedThumbnail: UploadThumbnail;
}
export const uploadThumbnail = async (
  gameId: number,
  images: FormData
): Promise<ApiResponse<UploadThumbnailSuccessResponse>> => {
  try {
    const response = await api.post(`/game/${gameId}/upload-thumbnail`, {
      data: images,
    });

    if (!response.data) {
      // const errorData = (await response.json()) as { message: string };
      throw new Error("Failed to upload thumbnails");
    }

    const data = response.data as UploadThumbnail[];
    if (!data) {
      throw new Error("Failed to upload thumbnails");
    }

    revalidateTag("game-info");
    return { success: true, uploadedThumbnail: data[0] };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
