"use server";
import { revalidateTag } from "next/cache";
import type { HttpError } from "@choosetale/nestia-type";
import api from "@/app/api/axios/axios";
import type { ApiResponse, SuccessResponse } from "../action";

export const deleteThumbnail = async (
  gameId: number,
  imageId: number
): Promise<ApiResponse<SuccessResponse>> => {
  try {
    await api.delete(`/game/${gameId}/thumbnail/${imageId}`);

    revalidateTag("game-info");
    return { success: true };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
