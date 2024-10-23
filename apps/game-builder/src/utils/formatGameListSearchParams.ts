import { type Genres } from "@choosetale/nestia-type/lib/structures/Genres";
import { type SortType } from "@/interface/customType";

export interface GameListSearchParams {
  genre?: Genres | "ALL";
  sort?: SortType;
  page?: number;
  limit?: number;
}

export type FormattedSearchParams = ReturnType<
  typeof formatGameListSearchParams
>;

export const formatGameListSearchParams = ({
  genre = "ALL",
  sort = "LATEST",
  page = 1,
  limit = 6,
}: GameListSearchParams) => {
  return {
    genre,
    sort,
    page,
    limit,
  };
};
