"use server";
import type { HttpError } from "@choosetale/nestia-type";
import type { GetAllGameResDto as GetGameAllResDto } from "@choosetale/nestia-type/lib/structures/GetAllGameResDto";
import type { ApiErrorResponse, GameInfo } from "@/interface/customType";
import api from "@/app/api/axios/axios";
import type { ApiResponse, SuccessResponse } from "../action";

// --게임 정보 불러오기--
interface GetGameDataSuccessResponse extends SuccessResponse {
  gameInfo: GameInfo;
}

export const getGameInfoById = async (
  gameId: number
): Promise<ApiResponse<GetGameDataSuccessResponse>> => {
  try {
    const response = await api.get(`/game/${gameId}/data`, {
      next: { tags: ["game", "game-info"] },
    });
    const gameInfo = response.data as GameInfo;

    return { success: true, gameInfo };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};

// --게임 정보 전체 불러오기--
interface GetGameAllSuccessResponse extends SuccessResponse {
  gameAll: GetGameAllResDto;
}

export const getGameAllById = async (
  gameId: number
): Promise<ApiResponse<GetGameAllSuccessResponse>> => {
  try {
    const response = await api.get(`/game/${gameId}`, {
      next: { tags: ["game", "game-all"] },
    });
    const gameAll = response.data as ApiErrorResponse | GetGameAllResDto;
    if ("statusCode" in gameAll) {
      return { success: false, error: new Error(gameAll.message) };
    }

    return { success: true, gameAll };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
