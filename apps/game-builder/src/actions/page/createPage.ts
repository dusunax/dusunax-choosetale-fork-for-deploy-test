"use server";
import { revalidateTag } from "next/cache";
import type { HttpError } from "@choosetale/nestia-type";
import type { CreatePageResDto } from "@choosetale/nestia-type/lib/structures/CreatePageResDto";
import api from "@/lib/axios/axios";
import type { ApiResponse, SuccessResponse } from "../action";

interface CreateSuccessResponse extends SuccessResponse {
  page: CreatePageResDto;
}

export const createPage = async (
  gameId: number,
  pageData: { isEnding: boolean; content: string }
): Promise<ApiResponse<CreateSuccessResponse>> => {
  try {
    const response = await api.post(`/game/${gameId}/page`, pageData);
    const page = response.data as CreatePageResDto;

    revalidateTag("game-all");
    return { success: true, page };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
