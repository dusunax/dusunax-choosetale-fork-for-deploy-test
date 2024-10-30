"use server";
import type { Genres } from "@choosetale/nestia-type/lib/structures/Genres";
import type { GameList, OrderType } from "@/interface/customType";
import api from "@/lib/axios/axios";

export const getGameList = ({
  page,
  limit = 6,
  genre,
  order,
}: {
  page: number;
  limit?: number;
  genre: Genres | "ALL";
  order: OrderType;
}): Promise<{ data: GameList }> => {
  return api.get("/game-play/list", {
    params: {
      page,
      limit,
      genre,
      order,
    },
  });
};
