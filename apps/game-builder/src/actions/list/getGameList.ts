"use server";
import type { HttpError } from "@choosetale/nestia-type";
import type { Genres } from "@choosetale/nestia-type/lib/structures/Genres";
import type { GameList, SortType } from "@/interface/customType";
import api from "@/app/api/axios/axios";
import type { ApiResponse, SuccessResponse } from "../action";

interface ApiSuccessResponse extends SuccessResponse {
  gameList: GameList;
}

export const getGameList = async ({
  page,
  limit = 6,
  genre,
  sort,
}: {
  page: number;
  limit?: number;
  genre: Genres;
  sort: SortType;
}): Promise<ApiResponse<ApiSuccessResponse>> => {
  const url = `/game-play/list?page=${page}&limit=${limit}&genre=${genre}&sort=${sort}`;

  try {
    const response = await api.get(url);
    const data = response.data as GameList;

    return { success: true, gameList: data };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
