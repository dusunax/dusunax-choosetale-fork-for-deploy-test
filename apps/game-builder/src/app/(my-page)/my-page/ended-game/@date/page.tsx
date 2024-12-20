import GameListFilters from "@/components/common/game/game-list-filters/GameListFilters";
import { getEndedGame } from "@/actions/my-page/getEndedGame";
import { formatGameListSearchParams } from "@/utils/formatGameListSearchParams";
import { type EndedGameGroupDate } from "@/interface/customType";
import { type GameListParams } from "../page";
import EndedGameList from "./_components/GroupDateEndedGameList";

export const dynamic = "force-dynamic";

export default async function DatePage({ searchParams }: GameListParams) {
  const formattedSearchParams = formatGameListSearchParams(searchParams);

  const endedGame = (await getEndedGame({
    ...formattedSearchParams,
    limit: 8,
    page: 1,
    group: "date",
  })) as EndedGameGroupDate[];

  return (
    <div className="h-[calc(100%-7.25rem)] flex flex-col">
      <div className="flex justify-between items-center mt-4 mb-5 px-5">
        <GameListFilters
          searchParams={formattedSearchParams}
          option={{
            orders: [
              {
                value: "LATEST",
                optionLabel: "최신순",
              },
              {
                value: "OLDEST",
                optionLabel: "오래된 순",
              },
            ],
          }}
        />
      </div>

      <div className="h-full overflow-y-scroll">
        <div className="px-5 pb-20">
          <EndedGameList endedGame={endedGame} />
        </div>
      </div>
    </div>
  );
}
