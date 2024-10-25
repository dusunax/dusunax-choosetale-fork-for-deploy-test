import { type EndedGameGroupGame } from "@/interface/customType";
import GroupGameEndedGameCard from "./GroupGameEndedGameCard";

interface EndedGameListProps {
  endedGame: EndedGameGroupGame[];
}

export default function GroupGameEndedGameList({
  endedGame,
}: EndedGameListProps) {
  return (
    <div className="w-full grow-0 flex flex-col gap-4">
      {endedGame.map((game, index) => (
        <GroupGameEndedGameCard
          key={`${game.game.id}-${index}`}
          endedGame={game}
        />
      ))}
    </div>
  );
}
