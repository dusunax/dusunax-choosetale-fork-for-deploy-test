"use client";
import Game from "@/app/(game-list)/game-list/_components/Game";
import TextOverlayDiv from "@/components/common/TextOverlayDiv";
// import useGameList from "../_hooks/useGameList";
import { GameListSearchParams } from "@/utils/formatGameListSearchParams";
import { GameList as GameListType } from "@/interface/customType";

export default function GameList({
  gameList,
}: {
  connectSid: string;
  formattedSearchParams: GameListSearchParams;
  gameList: GameListType;
}) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-6">
        {gameList?.map((e) => <Game gameData={e} key={e.game.id} />)}
        {!gameList?.length && <TextOverlayDiv text="게임이 없습니다." />}
      </div>
    </div>
  );
  // const { observerRef, loading, error, hasMore, page } = useGameList(
  //   connectSid,
  //   formattedSearchParams
  // );

  // if (error) {
  //   return <p>{error}</p>;
  // }

  // return (
  //   <div>
  //     <div className="grid grid-cols-2 gap-x-2 gap-y-6">
  //       {gameList?.map((e) => <Game gameData={e} key={Math.random()} />)}
  //       {!loading && !hasMore && !gameList?.length && (
  //         <TextOverlayDiv text="게임이 없습니다." />
  //       )}
  //     </div>
  //     {loading && page > 2 && <p className="text-center">Loading...</p>}
  //     <div ref={observerRef} style={{ height: "1px" }} />
  //   </div>
  // );
}
