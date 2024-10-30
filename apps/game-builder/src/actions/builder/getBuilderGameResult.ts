"use server";
import type { HttpError } from "@choosetale/nestia-type";
import type { GameResult } from "@/interface/customType";
import api from "@/lib/axios/axios";
import type { ApiResponse, SuccessResponse } from "../action";

interface ApiSuccessResponse extends SuccessResponse {
  result: GameResult;
}

export const getBuilderGameResult = async (
  gameId: number
): Promise<ApiResponse<ApiSuccessResponse>> => {
  try {
    const response = await api.get(
      `/my-page/game-builder/game/${gameId}/result/`
    );

    const result = response.data as GameResult;
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
