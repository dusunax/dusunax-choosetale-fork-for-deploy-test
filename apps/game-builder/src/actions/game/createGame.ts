"use server";
import type { HttpError } from "@choosetale/nestia-type";
import type { CreateGameReqDto } from "@choosetale/nestia-type/lib/structures/CreateGameReqDto";
import type { CreateGameResDto } from "@choosetale/nestia-type/lib/structures/CreateGameResDto";
import api from "@/lib/axios/axios";
import type { ApiResponse, SuccessResponse } from "../action";

interface CreateSuccessResponse extends SuccessResponse {
  gameInitData: CreateGameResDto;
}

export const createGame = async (
  formData: CreateGameReqDto
): Promise<ApiResponse<CreateSuccessResponse>> => {
  try {
    const response = await api.post(`/game`, formData);

    const gameInitData = response.data as CreateGameResDto;
    return { success: true, gameInitData };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
