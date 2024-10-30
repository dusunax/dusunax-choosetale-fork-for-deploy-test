import { type Genres } from "@choosetale/nestia-type/lib/structures/Genres";
import { type OrderType } from "@/interface/customType";

export interface GameListSearchParams {
  genre?: Genres | "ALL";
  order?: OrderType;
  page?: number;
  limit?: number;
}

export type FormattedSearchParams = ReturnType<
  typeof formatGameListSearchParams
>;

export const formatGameListSearchParams = ({
  genre = "ALL",
  order = "LATEST",
  page = 1,
  limit = 6,
}: GameListSearchParams) => {
  return {
    genre,
    order,
    page,
    limit,
  };
};
