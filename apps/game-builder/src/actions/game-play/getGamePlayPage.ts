"use server";
import type { HttpError } from "@choosetale/nestia-type";
import api from "@/lib/axios/axios";
import type { GamePlayPage } from "@/interface/customType";
import type { ApiResponse, SuccessResponse } from "../action";

interface ApiSuccessResponse extends SuccessResponse {
  gamePlayPage: GamePlayPage;
}

export const getGamePlayPage = async (
  gameId: number,
  pageId: number
): Promise<ApiResponse<ApiSuccessResponse>> => {
  try {
    const response = await api.get(`/game-play/play/${gameId}/page/${pageId}`);

    const gamePlayPage = response.data as GamePlayPage;
    return { success: true, gamePlayPage };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
