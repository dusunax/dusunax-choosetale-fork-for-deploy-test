"use server";
import { revalidateTag } from "next/cache";
import type { HttpError } from "@choosetale/nestia-type";
import type { Genres } from "@choosetale/nestia-type/lib/structures/Genres";
import type { UpdateGameReqDto } from "@choosetale/nestia-type/lib/structures/UpdateGameReqDto";
import api from "@/lib/axios/axios";
import type { ApiResponse, SuccessResponse } from "../action";

interface UpdateSuccessResponse<>extends SuccessResponse {
  game: UpdateGameReqDto;
}

export const updateGame = async (
  formData: Omit<UpdateGameReqDto, "genre"> & { genre: Genres | "ALL" },
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
