import { cookies } from "next/headers";
import {
  formatGameListSearchParams,
  type GameListSearchParams,
} from "@/utils/formatGameListSearchParams";
import GameListFilters from "@/components/common/game/game-list-filters/GameListFilters";
import GameList from "./_components/GameList";
import { getGameList } from "@/actions/list/getGameList";

export const dynamic = "force-dynamic";

export interface GameListParams {
  searchParams: GameListSearchParams;
}

export default async function Page({ searchParams }: GameListParams) {
  const formattedSearchParams = formatGameListSearchParams(searchParams);
  const connectSid = cookies().get("connect.sid")?.value;
  const response = await getGameList({
    page: 1,
    limit: 6,
    genre: formattedSearchParams.genre,
    sort: formattedSearchParams.sort,
  });

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col mx-5 pt-4">
      <div className="flex justify-between items-center pb-4">
        <GameListFilters
          searchParams={formattedSearchParams}
          option={{
            sorts: [
              { value: "LATEST", optionLabel: "최신순" },
              { value: "POPULAR", optionLabel: "인기순" },
            ],
          }}
        />
      </div>
      <div className="h-[calc(100vh-12rem)] overflow-y-scroll">
        {connectSid && (
          <GameList
            connectSid={connectSid}
            formattedSearchParams={formattedSearchParams}
            gameList={response.data}
          />
        )}
      </div>
    </div>
  );
}
