"use server";
import type { HttpError } from "@choosetale/nestia-type";
import type { GamePlay } from "@/interface/customType";
import api from "@/lib/axios/axios";
import type { ApiResponse, SuccessResponse } from "../action";

interface ApiSuccessResponse extends SuccessResponse {
  gamePlay: GamePlay;
}

export const postGamePlayChoice = async (
  playId: number,
  choiceId: number
): Promise<ApiResponse<ApiSuccessResponse>> => {
  try {
    const response = await api.post(
      `/game-play/play/${playId}/choice/${choiceId}`
    );

    const gamePlay = response.data as GamePlay;
    return { success: true, gamePlay };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
