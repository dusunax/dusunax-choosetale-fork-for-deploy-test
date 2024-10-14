"use server";
import { revalidateTag } from "next/cache";
import type { HttpError } from "@choosetale/nestia-type";
import api from "@/app/api/axios/axios";
import type { GamePlay } from "@/interface/customType";
import type { ApiResponse, SuccessResponse } from "../action";

interface ApiSuccessResponse extends SuccessResponse {
  gamePlay: GamePlay;
}

export const postGameFirstStart = async (
  gameId: number
): Promise<ApiResponse<ApiSuccessResponse>> => {
  try {
    const response = await api.post(`/game-play/intro/${gameId}/first-start`);
    const gamePlay = response.data as GamePlay;

    revalidateTag("game-intro");
    return { success: true, gamePlay };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
