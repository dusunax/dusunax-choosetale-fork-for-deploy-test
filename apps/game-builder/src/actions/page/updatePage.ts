"use server";
import { revalidateTag } from "next/cache";
import type { HttpError } from "@choosetale/nestia-type";
import type { UpdatePageResDto } from "@choosetale/nestia-type/lib/structures/UpdatePageResDto";
import api from "@/lib/axios/axios";
import type { ApiResponse, SuccessResponse } from "../action";

interface ApiSuccessResponse extends SuccessResponse {
  page: UpdatePageResDto;
}

export const updatePage = async (
  gameId: number,
  pageId: number,
  pageData: {
    abridgement: string;
    content: string;
    isEnding: boolean;
  }
): Promise<ApiResponse<ApiSuccessResponse>> => {
  try {
    const response = await api.patch(
      `/game/${gameId}/page/${pageId}`,
      pageData
    );
    const page = response.data as UpdatePageResDto;

    revalidateTag("game-all");
    return { success: true, page };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
