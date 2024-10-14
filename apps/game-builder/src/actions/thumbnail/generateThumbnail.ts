"use server";
import { revalidateTag } from "next/cache";
import type { HttpError } from "@choosetale/nestia-type";
import api from "@/app/api/axios/axios";
import type { ApiResponse, SuccessResponse } from "../action";

interface GenerateThumbnailSuccessResponse extends SuccessResponse {
  generatedThumbnail: {
    imageId: number;
    url: string;
  };
}
export const generateThumbnail = async (
  gameId: number
): Promise<ApiResponse<GenerateThumbnailSuccessResponse>> => {
  try {
    const response = await api.post(`/game/${gameId}/recommend-image`);
    const generatedThumbnail =
      response.data as GenerateThumbnailSuccessResponse["generatedThumbnail"];

    revalidateTag("game-info");
    return {
      success: true,
      generatedThumbnail,
    };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
