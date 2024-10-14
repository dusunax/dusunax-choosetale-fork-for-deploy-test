"use server";
import type { HttpError } from "@choosetale/nestia-type";
import api from "@/app/api/axios/axios";
import type { GameIntro } from "@/interface/customType";
import type { ApiResponse, SuccessResponse } from "../action";

interface ApiSuccessResponse extends SuccessResponse {
  intro: GameIntro;
}

export const getGameIntro = async (
  gameId: number
): Promise<ApiResponse<ApiSuccessResponse>> => {
  try {
    const response = await api.get(`/game-play/intro/${gameId}`, {
      next: { tags: ["game-intro"] },
    });

    const intro = response.data as GameIntro;
    return { success: true, intro };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
