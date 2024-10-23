"use client";
import Game from "@/app/(game-list)/game-list/_components/Game";
import TextOverlayDiv from "@/components/common/TextOverlayDiv";
import { type GameList as GameListType } from "@/interface/customType";
import { type GameListSearchParams } from "@/utils/formatGameListSearchParams";
import useGameList from "../_hooks/useGameListWithParams";

export default function GameList({
  formattedSearchParams,
  gameList,
}: {
  connectSid: string;
  formattedSearchParams: GameListSearchParams;
  gameList: GameListType;
}) {
  const { currentGameList, observerRef, isLoading } = useGameList({
    gameList,
    formattedSearchParams,
  });

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-6">
        {currentGameList?.map((e) => <Game gameData={e} key={e.game.id} />)}
      </div>

      {!isLoading && !currentGameList?.length && (
        <TextOverlayDiv text="게임이 없습니다." />
      )}
      <div ref={observerRef} className="h-1 -mt-16" />
    </div>
  );
}
