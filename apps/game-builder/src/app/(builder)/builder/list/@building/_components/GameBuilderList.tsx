import Link from "next/link";
import { type GameBuilderGame } from "@/interface/customType";
import TextOverlayDiv from "@/components/common/TextOverlayDiv";
import GameBuilderCard from "../../_components/GameBuilderCard";
import GameBuilderContent from "../../_components/GameBuilderContent";
import GameBuilderHeader from "./GameBuilderHeader";

export default function GameBuilderList({
  builderGames,
}: {
  builderGames: GameBuilderGame;
}) {
  const games = builderGames.games;
  if (games.length === 0) {
    return (
      <TextOverlayDiv text="현재 제작한 게임이 없어요.<br />게임을 제작해볼까요?" />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {games.map((game) => (
        <Link href={`/game/${game.id}/builder`} key={game.id}>
          <GameBuilderCard>
            <>
              <GameBuilderHeader game={game} />
              <GameBuilderContent game={game} />
            </>
          </GameBuilderCard>
        </Link>
      ))}
    </div>
  );
}
