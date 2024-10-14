"use server";
import { revalidateTag } from "next/cache";
import type { HttpError } from "@choosetale/nestia-type";
import type { UpdateGameReqDto } from "@choosetale/nestia-type/lib/structures/UpdateGameReqDto";
import api from "@/app/api/axios/axios";
import type { ApiResponse, SuccessResponse } from "../action";

interface UpdateSuccessResponse extends SuccessResponse {
  game: UpdateGameReqDto;
}

export const updateGame = async (
  formData: UpdateGameReqDto,
  gameId: number
): Promise<ApiResponse<UpdateSuccessResponse>> => {
  try {
    const response = await api.patch(`/game/${gameId}`, formData);
    const game = response.data as UpdateGameReqDto;

    revalidateTag("game-info");
    return { success: true, game };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
